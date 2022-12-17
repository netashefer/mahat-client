import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import excelCommunicator from "../../../communication/excelCommunicator";
import graphCommunicator from "../../../communication/graphCommunicator";
import { notifyError, notifySuccess } from "../../../helpers/toaster";
import { useAddWidget } from "../../../recoil/customHooks/useWidgetHandler";
import { dataSourcesAtom } from "../../../recoil/dataSources/dataSources";
import { graphsAtom } from "../../../recoil/graphs/graphs";
import { Aggragation, Graph, GraphType } from "../../../types/graph.types";
import Dropdown from "../../Common/Dropdown/Dropdown";
import Input from "../../Common/Input/Input";
import { chartMapping, FieldConfig } from "./chartParametersMapping";
import './ParametersPanel.scss';

const ParametersPanel = () => {
	const dataSources = useRecoilValue(dataSourcesAtom);
	const [dataSource, setDataSource] = useState<FieldConfig>(null);
	const [graphType, setGraphType] = useState<FieldConfig>({ value: 'pie', displayName: 'Pie' }); //for the time being all of these are useState
	const [xAxis, setXAxis] = useState<FieldConfig>(null);
	const [yAxis, setYAxis] = useState<FieldConfig>(null);
	const [graphName, setGraphName] = useState('');
	const [schemaFields, setSchemaFields] = useState<FieldConfig[]>(null);
	const addGraphToDashboard = useAddWidget();

	const addGraphToExistingGraphs = useRecoilCallback(({ set }) => (graph: Graph) => {
        set(graphsAtom, prevState => [...prevState, graph]);
    }, []);

	const getDataSourceSchema = async () => {
		if (dataSource?.value) {
			const schema = await excelCommunicator.getSchema(dataSource?.value);
			setSchemaFields(schema.map(s => ({ value: s, displayName: s })));
		}
	};

	useEffect(() => {
		getDataSourceSchema();

		return () => {
			setSchemaFields(null);
		}; //eslint-disable-next-line
	}, [dataSource]);


	const saveGraph = async () => {
		const graphToSave: Graph = {
			dataSourceId: dataSource?.value,
			graphConfig: {
				x_field: xAxis.value,
				y_field: { aggragation: yAxis.value as Aggragation },
			},
			template: { type: graphType.value as GraphType },
			title: graphName,
		};

		try{
			const savedGraph = await graphCommunicator.createGraph(graphToSave);
			addGraphToExistingGraphs(savedGraph);
			addGraphToDashboard(savedGraph.graphId)
			notifySuccess("Sucessfully created your graph!")
		} catch (e) {
			console.log(e)
            notifyError("We couldn't create your graph");
        }
	};

	return (
		<div className='parameters-panel'>
			<Dropdown value={dataSource} onChange={setDataSource} label="Data Source" items={dataSources?.map(ds => ({ displayName: ds.displayName, value: ds.dataSourceId }))} />
			<hr />
			<Dropdown value={graphType} onChange={setGraphType} label="Graph Type" items={[{ value: 'pie', displayName: 'Pie' }, { value: 'column', displayName: 'Column' }, { value: 'line', displayName: 'Line' }]} />
			<Dropdown value={xAxis} onChange={setXAxis} label="X Axis" items={schemaFields} />
			<Dropdown value={yAxis} onChange={setYAxis} label="Y Axis" items={chartMapping[graphType?.value as GraphType]?.yFieldOptions} />
			<hr />
			<Input value={graphName} onChange={setGraphName} label={"Graph Name"} />
			<button onClick={saveGraph}> Save Graph </button>
		</div>
	);

};

export default ParametersPanel;
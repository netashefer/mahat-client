import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import excelCommunicator from "../../../communication/excelCommunicator";
import graphCommunicator from "../../../communication/graphCommunicator";
import { notifyError, notifySuccess } from "../../../helpers/toaster";
import { useAddWidget } from "../../../recoil/customHooks/useWidgetHandler";
import { dataSourcesAtom } from "../../../recoil/dataSources/dataSources";
import { graphsAtom } from "../../../recoil/graphs/graphs";
import { Aggragation, Graph, GraphType } from "../../../types/graph.types";
import Dropdown, { Item } from "../../Common/Dropdown/Dropdown";
import Input from "../../Common/Input/Input";
import RenderIf from "../../Common/RenderIf/RenderIf";
import MultipleSelect from "../../MultiSelect/MultiSelect";
import { chartMapping, graphTypes } from "./chartParametersMapping";
import './ParametersPanel.scss';

const ParametersPanel = () => {
	const dataSources = useRecoilValue(dataSourcesAtom);
	const [dataSource, setDataSource] = useState<Item>(null);
	const [graphType, setGraphType] = useState<Item>(null); //for the time being all of these are useState
	const [xAxis, setXAxis] = useState<Item>(null);
	const [yAxisField, setYAxisField] = useState<Item>(null);
	const [yAxis, setYAxis] = useState<Item<Aggragation>>(null);
	const [graphName, setGraphName] = useState('');
	const [schemaFields, setSchemaFields] = useState<Item[]>(null);
	const [dataFields, setDataFields] = useState<string[]>(null);
	const addGraphToDashboard = useAddWidget();

	const addGraphToExistingGraphs = useRecoilCallback(({ set }) => (graph: Graph) => {
		set(graphsAtom, prevState => [...prevState, graph]);
	}, []);

	const getDataSourceSchema = async () => {
		if (dataSource?.value) {
			const schema = await excelCommunicator.getSchema(dataSource?.value);
			setSchemaFields(schema.map(s => ({ value: s, label: s })));
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
				x_field: xAxis?.value || null,
				y_field: { aggragation: yAxis?.value, field: yAxisField?.value || null },
				dataFields: dataFields?.map(f => ({ field: f, label: f }))
			},
			template: { type: graphType.value as GraphType },
			title: graphName,
		};

		console.log(graphToSave);


		try {
			const graphId = await graphCommunicator.createGraph(graphToSave) as string;
			addGraphToExistingGraphs({ ...graphToSave, graphId });
			addGraphToDashboard(graphId);
			notifySuccess("Sucessfully created your graph!");
		} catch (e) {
			console.log(e);
			notifyError("We couldn't create your graph");
		}
	};

	const chartConfig = chartMapping[graphType?.value as GraphType];

	return (
		<div className='parameters-panel'>
			<Dropdown
				value={dataSource}
				onChange={setDataSource}
				label="Data Source"
				items={dataSources?.map(ds => ({ label: ds.displayName, value: ds.dataSourceId }))}
			/>
			<hr />
			<Dropdown
				value={graphType}
				onChange={setGraphType}
				label="Graph Type"
				items={graphTypes}
			/>
			<RenderIf condition={!!(graphType && dataSource && chartConfig)}>
				<>
					<RenderIf condition={chartConfig?.xFieldOptions}>
						<Dropdown
							value={xAxis}
							onChange={setXAxis}
							label="X Axis"
							items={schemaFields}
						/>
					</RenderIf>
					<RenderIf condition={!!chartConfig?.yFieldOptions?.length}>
						<Dropdown
							value={yAxis}
							onChange={setYAxis}
							label="Y Axis"
							items={chartConfig?.yFieldOptions.map(v => ({ label: v.funcDisplayName, value: v.func }))}
						/>
					</RenderIf>
					<RenderIf condition={chartConfig?.isYField && yAxis?.value === 'uniqueValues'}>
						<Dropdown
							value={yAxisField}
							onChange={setYAxisField}
							label="field Y Axis"
							items={schemaFields}
						/>
					</RenderIf>
					<RenderIf condition={!!schemaFields && chartConfig?.isDataFields}>
						<MultipleSelect
							selectedOptions={dataFields || []}
							options={schemaFields?.map(f => f.label)}
							setSelectedOptions={setDataFields}
						/>
					</RenderIf>
					<hr />
					<Input value={graphName} onChange={setGraphName} label="Graph Name" />
					<button onClick={saveGraph}> Save Graph </button>
				</>
			</RenderIf>
		</div>
	);
};

export default ParametersPanel;
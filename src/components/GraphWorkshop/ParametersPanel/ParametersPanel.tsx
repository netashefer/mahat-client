import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import excelCommunicator from "../../../communication/excelCommunicator";
import { dataSourcesAtom } from "../../../recoil/dataSources/dataSources";
import { Aggragation, Graph, GraphConfig, GraphType } from "../../../types/graph.types";
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

	const getDataSourceSchema = async () => {
		if (dataSource.value) {
			const schema = await excelCommunicator.getschema(dataSource.value);
			setSchemaFields(schema.map(s => ({ value: s, displayName: s })));
		}
	};

	useEffect(() => {
		getDataSourceSchema();

		return () => {
			setSchemaFields(null);
		}; //eslint-disable-next-line
	}, [dataSource]);


	const saveGraph = () => {
		const graphConfig: Graph = {
			dataSourceId: dataSource?.value,
			graphConfig: {
				x_field: xAxis.value,
				y_field: { aggragation: yAxis.value as Aggragation },
			},
			template: { type: graphType.value as GraphType },
			title: graphName,
			graphId: "1" //TODO: genrete in server
		};
		console.log(graphConfig);
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
			<button onClick={saveGraph}>save</button>
		</div>
	);

};

export default ParametersPanel;
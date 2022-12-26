import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import excelCommunicator from "../../../communication/excelCommunicator";
import graphCommunicator from "../../../communication/graphCommunicator";
import { buildGraphConfig } from "../../../helpers/graphConfig.builder.helper";
import { notifyError, notifySuccess } from "../../../helpers/toaster";
import { useAddWidget } from "../../../recoil/customHooks/useWidgetHandler";
import { dataSourcesAtom } from "../../../recoil/dataSources/dataSources";
import { graphsAtom } from "../../../recoil/graphs/graphs";
import { Aggragation, Graph, GraphType } from "../../../types/graph.types";
import Dropdown, { OptionItem } from "../../Common/Dropdown/Dropdown";
import Input from "../../Common/Input/Input";
import RenderIf from "../../Common/RenderIf/RenderIf";
import MultipleSelect from "../../MultiSelect/MultiSelect";
import { chartMapping, graphTypes } from "./chartParametersMapping";
import './ParametersPanel.scss';

const ParametersPanel = () => {
	const dataSources = useRecoilValue(dataSourcesAtom);
	const [dataSource, setDataSource] = useState<OptionItem>(null);
	const [graphType, setGraphType] = useState<OptionItem<GraphType>>(null); //for the time being all of these are useState
	const [xAxis, setXAxis] = useState<OptionItem>(null);
	const [yAxisField, setYAxisField] = useState<OptionItem>(null);
	const [yAxis, setYAxis] = useState<OptionItem<Aggragation>>(null);
	const [graphName, setGraphName] = useState('');
	const [schemaFields, setSchemaFields] = useState<OptionItem[]>(null);
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
		const graphToSave = buildGraphConfig(dataSource, xAxis, yAxis, yAxisField, graphType, dataFields, graphName);

		try {
			const graphId = await graphCommunicator.createGraph(graphToSave);
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
			<Dropdown
				value={graphType}
				onChange={setGraphType}
				label="Graph Type"
				items={graphTypes}
			/>
			<RenderIf condition={!!(graphType && dataSource && chartConfig)}>
				<>
					<RenderIf condition={!!chartConfig?.yFieldOptions?.length}>
						<>
							<Dropdown
								value={xAxis}
								onChange={setXAxis}
								label={chartConfig?.xFieldLabel || "X Axis"}
								items={schemaFields}
							/>
							<Dropdown
								value={yAxis}
								onChange={setYAxis}
								label="Y Axis"
								items={chartConfig?.yFieldOptions?.map(v => ({ label: v.funcDisplayName, value: v.func }))}
							/>
						</>
					</RenderIf>
					<RenderIf condition={yAxis?.value === Aggragation.uniqueValues}>
						<Dropdown
							value={yAxisField}
							onChange={setYAxisField}
							label="by field"
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
					<Input value={graphName} onChange={setGraphName} label="Graph Name" />
					<button onClick={saveGraph}> Save Graph </button>
				</>
			</RenderIf>
		</div>
	);
};

export default ParametersPanel;
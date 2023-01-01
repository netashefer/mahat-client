import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import excelCommunicator from "../../../communication/excelCommunicator";
import graphCommunicator from "../../../communication/graphCommunicator";
import { buildGraphConfig } from "../../../helpers/graphConfig.builder.helper";
import { notifyError, notifySuccess } from "../../../helpers/toaster";
import { useAddWidget } from "../../../recoil/customHooks/useWidgetHandler";
import { dataSourcesAtom } from "../../../recoil/dataSources/dataSources";
import { graphsAtom } from "../../../recoil/graphs/graphs";
import { Aggragation, Graph, GraphType } from "../../../types/graph.types";
import { setState } from "../../../types/utility.types";
import ActionButton from "../../../views/DashboardPage/DashboardActions/ActionButton";
import Dropdown, { OptionItem } from "../../Common/Dropdown/Dropdown";
import Input from "../../Common/Input/Input";
import RenderIf from "../../Common/RenderIf/RenderIf";
import withLoader from "../../Common/withLoader/withLoader";
import MultipleSelect from "../../MultiSelect/MultiSelect";
import { chartMapping, graphTypes } from "./chartParametersMapping";
import './ParametersPanel.scss';

interface ParametersPanelProps {
	graphToEdit?: Graph;
	onClose: setState<void>,
}

const ParametersPanel = ({ graphToEdit, onClose }: ParametersPanelProps) => {
	const dataSources = useRecoilValue(dataSourcesAtom);
	const dataSourceMapping = dataSources?.map(ds => ({ label: ds.displayName, value: ds.dataSourceId }));

	const [dataSource, setDataSource] = useState<OptionItem>(graphToEdit ? dataSourceMapping.find(ds => ds.value === graphToEdit?.dataSourceId) : null);
	const [graphType, setGraphType] = useState<OptionItem<GraphType>>(graphToEdit ? graphTypes.find(g => g.value === graphToEdit?.template.type) : null);

	const chartConfig = chartMapping[graphType?.value as GraphType];
	const yFieldOptions = chartConfig?.yFieldOptions?.map(v => ({ label: v.funcDisplayName, value: v.func }));
	const axesConfig = {
		yAxisConfig: {
			yAxisField: { label: graphToEdit?.graphConfig?.y_field.field, value: graphToEdit?.graphConfig?.y_field.field },
			yAxis: yFieldOptions?.find(y => y.value = graphToEdit?.graphConfig?.y_field?.aggragation)
		},
		xAxisConfig: {
			xAxis: { label: graphToEdit?.graphConfig?.x_field, value: graphToEdit?.graphConfig?.x_field }
		}
	};

	const [xAxis, setXAxis] = useState<OptionItem>(graphToEdit ? axesConfig.xAxisConfig.xAxis : null);
	const [yAxisField, setYAxisField] = useState<OptionItem>(graphToEdit ? axesConfig?.yAxisConfig?.yAxisField : null);
	const [yAxis, setYAxis] = useState<OptionItem<Aggragation>>(graphToEdit ? axesConfig?.yAxisConfig?.yAxis : null);
	const [graphName, setGraphName] = useState(graphToEdit ? graphToEdit.title : '');
	const [schemaFields, setSchemaFields] = useState<OptionItem[]>(null);
	const [dataFields, setDataFields] = useState<string[]>(graphToEdit ? graphToEdit?.graphConfig?.dataFields : null);
	const addGraphToDashboard = useAddWidget();

	const addGraphToExistingGraphs = useRecoilCallback(({ set }) => (graph: Graph) => {
		set(graphsAtom, prevState => [...prevState, graph]);
	}, []);

	const editGraphInExistingGraphs = useRecoilCallback(({ set }) => (graph: Graph) => {
		set(graphsAtom, prevState => [...prevState.filter(g => g.graphId !== graph.graphId), graph]);
	}, []);

	const getDataSourceSchema = async () => {
		if (dataSource?.value) {
			const schema = await excelCommunicator.getSchema(dataSource?.value);
			setSchemaFields(schema.map(s => ({ value: s, label: s })));
		}
	};

	const overrideFieldBy = (callback: Function) => {
		callback();
		setDataFields(null);
	};

	useEffect(() => {
		getDataSourceSchema();

		return () => {
			setSchemaFields(null);
		}; //eslint-disable-next-line
	}, [dataSource]);


	const saveGraph = async () => {
		const graphToSave = buildGraphConfig(dataSource, xAxis, yAxis, yAxisField, graphType, dataFields, graphName);

		if (!graphToEdit) {
			createGraph(graphToSave);
		} else {
			editGraph(graphToSave);
		}

		onClose();
	};

	const createGraph = async (graph: Graph) => {
		try {
			const graphId = await graphCommunicator.createGraph(graph) as string;
			addGraphToExistingGraphs({ ...graph, graphId });
			addGraphToDashboard(graphId);
			notifySuccess("Sucessfully created your graph!");
		} catch (e) {
			console.error(e);
			notifyError("We couldn't create your graph");
		}
	};

	const editGraph = async (graph: Graph) => {
		try {
			const graphWithGraphId = { ...graph, graphId: graphToEdit.graphId };
			await graphCommunicator.editGraph(graphWithGraphId);
			editGraphInExistingGraphs(graphWithGraphId);
			notifySuccess("Sucessfully saved your edited graph!");
		} catch (e) {
			console.error(e);
			notifyError("We couldn't save your edited graph");
		}
	};

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
								onChange={(xAxis) => overrideFieldBy(() => setXAxis(xAxis))}
								label={chartConfig?.xFieldLabel || "X Axis"}
								items={schemaFields}
							/>
							<Dropdown
								value={yAxis}
								onChange={(yAxis) => overrideFieldBy(() => setYAxis(yAxis))}
								label="Y Axis"
								items={chartConfig?.yFieldOptions?.map(v => ({ label: v.funcDisplayName, value: v.func }))}
							/>
						</>
					</RenderIf>
					<RenderIf condition={yAxis?.value === Aggragation.uniqueValues || yAxis?.value === Aggragation.sum}>
						<Dropdown
							value={yAxisField}
							onChange={(yAxisField) => overrideFieldBy(() => setYAxisField(yAxisField))}
							label="By Field"
							items={schemaFields}
						/>
					</RenderIf>
					<RenderIf condition={!!schemaFields && chartConfig?.isDataFields}>
						<MultipleSelect
							label="Fields"
							selectedOptions={dataFields || []}
							options={schemaFields?.map(f => f.label)}
							setSelectedOptions={setDataFields}
						/>
					</RenderIf>
					<Input value={graphName} onChange={setGraphName} label="Graph Name" />
					<div className="action-buttons-container">
						<ActionButton text="Save Graph" onClick={saveGraph} borderColor="green" Icon={graphToEdit ? ModeEditIcon : undefined} />
					</div>
				</>
			</RenderIf>
		</div>
	);
};

export default withLoader(ParametersPanel);
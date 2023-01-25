import _ from "lodash";
import { OptionItem } from "../components/Common/Dropdown/Dropdown";
import { chartMapping } from "../components/GraphWorkshop/ParametersPanel/chartParametersMapping";
import { Aggragation, DependentAggregation, Graph, GraphType } from "../types/graph.types";
import { PartialRecord, Subset } from "../types/utility.types";

export const graphBuilderMapping: PartialRecord<GraphType, Subset<Graph>> = {
    wordcloud: {
        graphConfig: {
            dataFieldsAggregation: 'weight',
        },
        template: {
            seriesName: 'Occurrences'
        }
    }
};

export const buildGraphConfig = (
    dataSource: OptionItem,
    xAxis: OptionItem,
    yAxis: OptionItem<Aggragation>,
    yAxisField: OptionItem,
    graphType: OptionItem<GraphType>,
    dataFields: string[],
    graphName: string,
) => {
    const graphTypeName = graphType.value;

    const graphToSave: Graph = {
        dataSourceId: dataSource?.value,
        graphConfig: {
            x_field: xAxis?.value || null,
            y_field: { aggragation: yAxis?.value, field: yAxisField?.value || null },
            dataFields,
            dataFieldsAggregation: graphBuilderMapping[graphTypeName]?.graphConfig?.dataFieldsAggregation || null
        },
        template: { type: graphTypeName, seriesName: graphBuilderMapping[graphTypeName]?.template?.seriesName || null },
        title: graphName,
    };

    return graphToSave;
};

export const validateGraph = (graph: Graph) => {
    const graphType = graph.template?.type;
    const mustHaveElements: any[] = [graph.title, graphType];
    chartMapping[graphType].isDataFields && mustHaveElements.push(graph.graphConfig.dataFields);

    if (chartMapping[graphType].yFieldOptions?.length) {
        mustHaveElements.push(...[graph.graphConfig.x_field, graph.graphConfig.y_field.aggragation]);
        if (DependentAggregation.includes(graph.graphConfig.y_field.aggragation)) {
            mustHaveElements.push(graph.graphConfig.y_field.field);
        }
    }

    return mustHaveElements.every(configElement => !_.isEmpty(configElement));
};
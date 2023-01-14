import { buildGraphConfig } from "../graphConfig.builder.helper";
import { graphOptionsMock, wordCloudOptionsMock } from "./graphConfig.mocks";

describe("graph config tests", () => {
	test("build graph config should create graph config from graph options", () => {
		// Arrange
		const { dataSource, xAxis, yAxis, yAxisField, graphType, dataFields, graphName } = graphOptionsMock;
		
		// Act
		const graphConfig = buildGraphConfig(dataSource, xAxis, yAxis, yAxisField, graphType, dataFields, graphName);

		// Assert
		expect(graphConfig).toEqual({
			dataSourceId: dataSource.value,
			graphConfig: {
				dataFieldsAggregation: null,
				x_field: xAxis.value,
				y_field: { aggragation: yAxis.value, field: yAxisField.value },
				dataFields,
			},
			template: { type: graphType.value, seriesName: null },
			title: graphName,
		})
	});
	test("build graph config should create graph config from graph options for graph using graphBuilderMapping", () => {
		// Arrange
		const { dataSource, xAxis, yAxis, yAxisField, graphType, dataFields, graphName } = wordCloudOptionsMock;
		
		// Act
		const graphConfig = buildGraphConfig(dataSource, xAxis, yAxis, yAxisField, graphType, dataFields, graphName);

		// Assert
		expect(graphConfig).toEqual({
			dataSourceId: dataSource.value,
			graphConfig: {
				x_field: null,
				y_field: {
					field: null
				},
				dataFields: dataFields,
				dataFieldsAggregation: "weight"
			},
			template: {
				type: graphType.value,
				seriesName: "Occurrences"
			},
			title: graphName
		})
	})
})
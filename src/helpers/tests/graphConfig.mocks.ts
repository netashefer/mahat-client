import { Aggragation, GraphType } from "../../types/graph.types";

export const graphOptionsMock = {
	dataSource: {
		label: "abc.xlsx",
		value: "e3fd929b-1204-4b0f-83d1-0760ae3dd56b"
	},
	xAxis: {
		value: "wow(NUMBER)",
		label: "wow(NUMBER)"
	},
	yAxis: {
		value: Aggragation.uniqueValues,
		label: "By Unique Values",
	},
	yAxisField: {
		value: "wow(NUMBER)",
		label: "wow(NUMBER)"
	},
	graphType: {
		value: "pie" as GraphType,
		label: "Pie"
	},
	dataFields: ["wow(NUMBER)"],
	graphName: "fwfefwefw"
}

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GraphOptionsMap } from "../../../helpers/graph.option.helper";
import { BACKGROUND_COLOR } from "../../../styles/styles.constants";
import { Graph } from "../../../types/graph.types";
import { Data } from "../../../types/table.types";

interface HighchartsGraphProps {
    graph: Graph;
    width: number;
    height: number;
    aggregatedData: Data;
}

const HighchartsGraph = ({ graph, width, height, aggregatedData }: HighchartsGraphProps) => {
    const options: Partial<Highcharts.Options> = {
        ...GraphOptionsMap[graph?.template?.type],
        chart: {
            backgroundColor: BACKGROUND_COLOR,
            ...GraphOptionsMap[graph?.template?.type]?.chart,
            width,
            height: height - 56
        },
        title: {
            text: ""
        },
        xAxis: {
            categories: aggregatedData.map(r => r.name)
        },
        series: [{
            name: 'item',
            data: aggregatedData,
            type: graph?.template?.type as any
        }],
        legend: {
            itemStyle: { color: "white" }
        }
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default HighchartsGraph;

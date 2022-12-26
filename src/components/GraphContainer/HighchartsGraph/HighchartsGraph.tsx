import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting_data from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exporting_offline from 'highcharts/modules/offline-exporting';
import wordcloud from 'highcharts/modules/wordcloud';
import { useImperativeHandle, useRef } from "react";
import { GraphOptionsMap } from "../../../helpers/graph.option.helper";
import { SECONDARY_BACKGROUND_COLOR } from "../../../styles/styles.constants";
import { Graph } from "../../../types/graph.types";
import { Data } from "../../../types/table.types";
import { GraphHandler } from "../../WidgetContainer/WidgetContainer";

// init the module
wordcloud(Highcharts);
HC_exporting(Highcharts);
HC_exporting_data(Highcharts);
HC_exporting_offline(Highcharts);

interface HighchartsGraphProps {
    graph: Graph;
    width: number;
    height: number;
    aggregatedData: Data;
    graphHandler: React.MutableRefObject<GraphHandler>;
}

const HighchartsGraph = ({ graph, width, height, aggregatedData, graphHandler }: HighchartsGraphProps) => {
    const ref = useRef<HighchartsReact.RefObject>();

    const downloadImage = () => {
        ref.current?.chart?.exportChartLocal({ type: 'image/png', filename: graph.title });
    };

    const downloadCsv = () => {
        ref.current?.chart?.downloadCSV();
    };

    useImperativeHandle(graphHandler, () => ({
        downloadCsv,
        downloadImage,
    }));

    const options: Partial<Highcharts.Options> = {
        ...GraphOptionsMap[graph?.template?.type],
        chart: {
            backgroundColor: SECONDARY_BACKGROUND_COLOR,
            ...GraphOptionsMap[graph?.template?.type]?.chart,
            width,
            height: height - 56
        },
        title: {
            text: ""
        },
        xAxis: {
            categories: aggregatedData.map(r => r.name),
        },
        series: [{
            name: graph?.template?.seriesName || 'Item',
            data: aggregatedData,
            type: graph?.template?.type as any,
        }],
        legend: {
            itemStyle: { color: "white" }
        },
        exporting: { enabled: false }
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={ref}
        />
    );
};

export default HighchartsGraph;

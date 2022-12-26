import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import FileSaver from 'file-saver';
import { toBlob } from 'html-to-image';
import { useImperativeHandle, useRef } from 'react';
import { v4 as uuid } from "uuid";
import { prepTable } from "../../../helpers/prepTable";
import { SECONDARY_BACKGROUND_COLOR } from '../../../styles/styles.constants';
import { Graph } from "../../../types/graph.types";
import { Data } from "../../../types/table.types";
import { DownloadButtonProps } from '../../WidgetContainer/DownloadButtons/DownloadButtons';
import { GraphHandler } from '../../WidgetContainer/WidgetContainer';

interface TableGraphProps {
    graph: Graph;
    aggregatedData: Data;
    DownloadCsvComponent: React.ComponentType<DownloadButtonProps>;
    graphHandler: React.MutableRefObject<GraphHandler>;
}
type ExportCsvHandler = Pick<GraphHandler, 'downloadCsv'>;

interface DownloadToolBar {
    csvHandler: React.MutableRefObject<ExportCsvHandler>;
}

const DownloadToolbar = ({ csvHandler }: DownloadToolBar) => {
    const apiRef = useGridApiContext();

    const downloadCsv = async () => {
        apiRef.current.exportDataAsCsv();
    };

    useImperativeHandle(csvHandler, () => ({
        downloadCsv: downloadCsv,
    }));

    return <GridToolbarContainer />;
};

const TableGraph = ({ graph, aggregatedData, graphHandler }: TableGraphProps) => {
    const tableRef = useRef<HTMLDivElement>();
    const csvHandler = useRef<ExportCsvHandler>();

    const downloadImage = async () => {
        const node = tableRef.current;
        const blob = await toBlob(node);
        FileSaver.saveAs(blob, `${graph.title}.png`);
    };

    const CustomToolBar = (
        <DownloadToolbar
            csvHandler={csvHandler}
        />
    );

    useImperativeHandle(graphHandler, () => ({
        downloadCsv: csvHandler?.current?.downloadCsv,
        downloadImage: downloadImage,
    }));

    return (
        <DataGrid
            ref={tableRef}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rows={aggregatedData}
            columns={prepTable(graph?.graphConfig)}
			getRowId={uuid}
            style={{ backgroundColor: SECONDARY_BACKGROUND_COLOR }}
            components={{ Toolbar: () => CustomToolBar }} // the only way we can accsess apiRef for export csv
        />
    );
};

export default TableGraph;

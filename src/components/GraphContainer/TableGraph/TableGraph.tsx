import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import FileSaver from 'file-saver';
import { toBlob } from 'html-to-image';
import { useRef } from 'react';
import { prepTable } from "../../../helpers/prepTable";
import { Graph } from "../../../types/graph.types";
import { Data } from "../../../types/table.types";
import { DownloadButtonProps, DownloadCsvButton, DownloadImageButton } from '../DownloadButtons/DownloadButtons';
import './TableGraph.scss';

interface TableGraphProps {
    graph: Graph;
    aggregatedData: Data;
    DownloadCsvComponent: React.ComponentType<DownloadButtonProps>;
}

interface DownloadToolBar {
    DownloadCsvComponent: React.ComponentType<DownloadButtonProps>;
    DownloadImageComponent: React.ComponentType<DownloadButtonProps>;
    downloadImage: () => void;
}

const DownloadToolbar = ({ DownloadCsvComponent, DownloadImageComponent, downloadImage }: DownloadToolBar) => {
    const apiRef = useGridApiContext();

    const downloadCsv = async () => {
        apiRef.current.exportDataAsCsv();
    };

    return (
        <GridToolbarContainer>
            <DownloadCsvComponent handleDownload={downloadCsv} />
            <DownloadImageComponent handleDownload={downloadImage} />
        </GridToolbarContainer>
    );
};

const TableGraph = ({ graph, aggregatedData }: TableGraphProps) => {
    const tableRef = useRef<HTMLDivElement>();

    const downloadImage = async () => {
        const node = tableRef.current.querySelector('.MuiDataGrid-main') as HTMLDivElement;
        const blob = await toBlob(node);
        FileSaver.saveAs(blob, `${graph.title}.png`);
    };

    const CustomToolBar = (
        <DownloadToolbar
            DownloadCsvComponent={DownloadCsvButton}
            DownloadImageComponent={DownloadImageButton}
            downloadImage={downloadImage}
        />
    );

    return (
        <DataGrid
            ref={tableRef}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rows={aggregatedData}
            columns={prepTable(graph.graphConfig)}
            components={{ Toolbar: () => CustomToolBar }}
        />
    );
};

export default TableGraph;

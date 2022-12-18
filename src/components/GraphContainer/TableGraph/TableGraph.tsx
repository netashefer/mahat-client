import { DataGrid } from '@mui/x-data-grid';
import { prepTable } from "../../../helpers/prepTable";
import { Graph } from "../../../types/graph.types";
import { Data } from "../../../types/table.types";

interface TableGraphProps {
    graph: Graph;
    aggregatedData: Data;
}

const TableGraph = ({ graph, aggregatedData }: TableGraphProps) => {

    return (
        <DataGrid
            pageSize={5}
            rowsPerPageOptions={[5]}
            rows={aggregatedData}
            columns={prepTable(graph.graphConfig)}
        />
    );
};

export default TableGraph;

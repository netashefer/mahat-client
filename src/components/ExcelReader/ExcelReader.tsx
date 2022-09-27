import { useState } from "react";
import * as XLSX from "xlsx";
import { convertToJson } from "../../helpers/xls-reader";
import { Table } from "../../types/data";
import './ExcelReader.scss';

interface ExcelReaderProps {
    addDataInstanceTable: (table: Table, info: any) => void;
}

const ExcelReader = ({ addDataInstanceTable }: ExcelReaderProps) => {
    const [file, setFile] = useState<Blob>(null);
    console.log(file);

    const filePathset = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        setFile(file);
    };

    const readFile = () => {
        const reader = new FileReader();
        reader.onload = (evt: any) => {// evt = on_file_select event
            const bstr = evt.target.result;/* Parse data */
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];/* Get first worksheet */
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws);/* Convert array of arrays */
            const table: Table = convertToJson(data);
            addDataInstanceTable(table, file);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="excel-reader">
            <input
                className="file-input"
                type="file"
                id="file"
                accept=".xls,.xlsx"
                onChange={filePathset}
            />
            {file && <button
                className="file-btn"
                onClick={readFile}
            >
                Read File
            </button>}
        </div>
    );
};

export default ExcelReader;

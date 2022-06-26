import { useState } from "react";
import * as XLSX from "xlsx";
import { convertToJson } from "../../helpers/xls-reader";
import { Data, Table } from "../../types/data";
import { setState } from "../../types/utility";
import { v4 as uuidv4 } from 'uuid';

interface ExcelReaderProps {
    addDataInstanceTable: (table: Table) => void;
}

const ExcelReader = ({ addDataInstanceTable }: ExcelReaderProps) => {
    const [file, setFile] = useState<Blob>(null);

    const filePathset = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        setFile(file);
    }

    const readFile = () => {
        const reader = new FileReader();
        reader.onload = (evt: any) => {// evt = on_file_select event
            const bstr = evt.target.result;/* Parse data */
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];/* Get first worksheet */
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws);/* Convert array of arrays */
            const table: Table = convertToJson(data);
            addDataInstanceTable(table);
        };
        reader.readAsBinaryString(file);
    }

    return (
        <div className="ExcelReader">
            <div>
                <input
                    type="file"
                    id="file"
                    onChange={filePathset}
                />
                <button
                    onClick={readFile}
                >
                    Read File
                </button>
            </div>
        </div>
    );
}

export default ExcelReader;

import { LinearProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRecoilCallback } from 'recoil';
import { onLoad } from "../../helpers/xls-reader";
import { ReactComponent as AddIcon } from "../../icons/addFile.svg";
import { ReactComponent as UploadIcon } from "../../icons/upload.svg";
import { dataSourcesAtom } from "../../recoil/dataSources/dataSources";
import { DataSource } from "../../types/entities";
import './ExcelReader.scss';

interface ExcelReaderProps {
    dashboardId: string;
}

const ExcelReader = ({ dashboardId }: ExcelReaderProps) => {
    const [file, setFile] = useState<File>(null);
    const [isLoading, setIsLoading] = useState(false);

    const filePathset = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file);
    };

    const readFile = () => {
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (evt) => onLoad(dashboardId, evt, file, onReadingSucceed, onReadingEnd);
        reader.readAsBinaryString(file);
    };

    const onReadingEnd = () => {
        setFile(null);
        setIsLoading(false);
    };

    const onReadingSucceed = useRecoilCallback(({ set }) => (newFile: DataSource) => {
        set(dataSourcesAtom, prev => [newFile, ...prev]);
    }, []);

    return (
        <div className="excel-reader">
            <input
                type="file"
                hidden
                id="raised-button-file"
                accept=".xls,.xlsx"
                onChange={filePathset}
            />
            <label htmlFor="raised-button-file">
                <UploadIcon className="upload-icon" />
            </label>
            {
                file &&
                <div className="file-container">
                    {isLoading && <LinearProgress className="loader" />}
                    <div className="file-section">
                        <div className="file-name" >
                            {file.name}
                        </div>
                        <AddIcon className="add-icon" onClick={readFile} />
                    </div>
                </div>
            }
        </div>
    );
};

export default ExcelReader;

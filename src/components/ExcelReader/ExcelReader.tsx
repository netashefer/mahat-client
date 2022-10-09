import { LinearProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRecoilCallback } from 'recoil';
import excelCommunicator from "../../communication/excelCommunicator";
import { notifySuccess } from "../../helpers/toaster";
import { onLoad } from "../../helpers/xls-reader";
import { ReactComponent as AddIcon } from "../../icons/addFile.svg";
import { ReactComponent as ReplaceIcon } from "../../icons/replace-icon.svg";
import { ReactComponent as UploadIcon } from "../../icons/upload.svg";
import { dataSourcesAtom } from "../../recoil/dataSources/dataSources";
import { Table } from "../../types/data";
import { setState } from "../../types/utility";
import './ExcelReader.scss';

interface ExcelReaderProps {
    dashboardId: string;
    isAdding: boolean;
    dataSourceIdToReplace?: string;
    setIsAdding: setState<boolean>;
}

const ExcelReader = ({ dashboardId, isAdding, dataSourceIdToReplace, setIsAdding }: ExcelReaderProps) => {
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

    const onReadingSucceed = useRecoilCallback(({ set }) => async (table: Table, fileName: string) => {
        if (isAdding) {
            const dataSourceId = await excelCommunicator.addExcelDataSource({ table, dashboardId, displayName: fileName });
            set(dataSourcesAtom, prev => [{ dataSourceId, displayName: fileName }, ...prev]);
            notifySuccess("file added successfully");
        } else {
            await excelCommunicator.replaceExcelDataSource({ dataSourceId: dataSourceIdToReplace, table, dashboardId, displayName: fileName });
            set(dataSourcesAtom, prev => {
                return [...(prev?.filter(d => d.dataSourceId !== dataSourceIdToReplace) || []), { dataSourceId: dataSourceIdToReplace, displayName: fileName }];
            });
            setIsAdding(true);
            notifySuccess("file replaced successfully");
        }
    }, [isAdding, setIsAdding]);

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
                        {
                            isAdding ?
                                <AddIcon className="add-icon" onClick={readFile} /> :
                                <ReplaceIcon className="replace-icon" onClick={readFile} />
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default ExcelReader;

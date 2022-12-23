import { LinearProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRecoilCallback } from 'recoil';
import excelCommunicator from "../../communication/excelCommunicator";
import { notifyError, notifySuccess } from "../../helpers/toaster";
import { onLoad } from "../../helpers/xls-reader";
import AddIcon from '@mui/icons-material/Add';
import { ReactComponent as ReplaceIcon } from "../../icons/replace-icon.svg";
import { ReactComponent as UploadIcon } from "../../icons/upload.svg";
import { dataSourcesAtom } from "../../recoil/dataSources/dataSources";
import { Table } from "../../types/table.types";
import { setState } from "../../types/utility.types";
import './ExcelReader.scss';
import { FileUploadStage } from "../../types/dataSource.types";

interface ExcelReaderProps {
    dashboardId: string;
    dataSourceIdToReplace?: string;
    fileUploadStage: FileUploadStage;
    setFileUploadStage: setState<FileUploadStage>;
}

const ExcelReader = ({ dashboardId, fileUploadStage, dataSourceIdToReplace, setFileUploadStage }: ExcelReaderProps) => {
    const [file, setFile] = useState<File>(null);
    const [isLoading, setIsLoading] = useState(false);

    const filePathset = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file);
    };

    console.log(file);


    const readFile = () => {
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (evt) => onLoad(file, onReadingSucceed, onReadingEnd);
        reader.readAsBinaryString(file);
    };

    const onReadingEnd = () => {
        setFile(null);
        setIsLoading(false);
    };

    const onReadingSucceed = useRecoilCallback(({ set }) => async (table: Table, fileName: string) => {
        try {
            if (fileUploadStage === FileUploadStage.add) {
                const dataSourceId = await excelCommunicator.addExcelDataSource({ table, dashboardId, displayName: fileName });
                set(dataSourcesAtom, prev => [{ dataSourceId, displayName: fileName }, ...prev]);
                notifySuccess("File added successfully");
            } else {
                await excelCommunicator.replaceExcelDataSource({ dataSourceId: dataSourceIdToReplace, table, dashboardId, displayName: fileName });
                set(dataSourcesAtom, prev => {
                    return [...(prev?.filter(d => d.dataSourceId !== dataSourceIdToReplace) || []), { dataSourceId: dataSourceIdToReplace, displayName: fileName }];
                });
                setFileUploadStage(FileUploadStage.add);
                notifySuccess("File replaced successfully");
            }
        } catch {
            notifyError("We couldn't save the file");
        }
    }, [fileUploadStage, setFileUploadStage]);

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
                            fileUploadStage === FileUploadStage.add ?
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

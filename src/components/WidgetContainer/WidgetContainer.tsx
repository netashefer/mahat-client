
import RemoveIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notifyError } from '../../helpers/toaster';
import { useRemoveWidget } from '../../recoil/customHooks/useWidgetHandler';
import { graphSelector } from '../../recoil/graphs/graphs';
import { Widget } from '../../types/widget.types';
import { DownloadCsvButton, DownloadImageButton } from './DownloadButtons/DownloadButtons';
import GraphContainer from '../GraphContainer/GraphContainer';
import GraphWorkshop from '../GraphWorkshop/GraphWorkshop';
import './WidgetContainer.scss';

interface WidgetContainerProps extends Widget { }

export const WIDGET_DRAGGABLE_TITLE_CLASSNAME = "widget-draggable-title";

export interface GraphHandler {
    downloadCsv: () => void;
    downloadImage: () => void;
}

const WidgetContainer = ({ widgetId, graphId, widgetProps }: WidgetContainerProps) => {
	const [shouldOpenGraphWorkshop, setShouldOpenGraphWorkshop] = useState(false);
    const removeWidget = useRemoveWidget();
    const containerRef = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const graph = useRecoilValue(graphSelector(graphId));
    const graphHandlerRef = useRef<GraphHandler>();

    const deleteWidget = (widgetId: string) => {
        try {
            removeWidget(widgetId);
        } catch {
            notifyError("Failed to remove widget");
        }
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            setWidth(event[0].contentBoxSize[0].inlineSize);
            setHeight(event[0].contentBoxSize[0].blockSize);
        });

        resizeObserver.observe(containerRef.current);
    }, []);

    const downloadCsv = () => {
        graphHandlerRef?.current?.downloadCsv();
    };

    const downloadImage = () => {
        graphHandlerRef?.current?.downloadImage();
    };

    return (
        <div
            className="widget-container"
            key={widgetId}
            ref={containerRef}
        >
            <div className='widget-top'>
                <div className='widget-top-bar-actions'>
                <EditIcon className='edit-icon' onClick={() => setShouldOpenGraphWorkshop(true)} />
                    <DownloadCsvButton className='download-csv-icon' handleDownload={downloadCsv} />
                    <DownloadImageButton className='download-image-icon' handleDownload={downloadImage} />
                </div>
                <p className={WIDGET_DRAGGABLE_TITLE_CLASSNAME}>
                    {graph?.title || "No Title"}
                </p>
                <RemoveIcon className='remove-icon' onClick={() => deleteWidget(widgetId)} />
            </div>
            {
                graph &&
                <GraphContainer
                    graph={graph}
                    width={width}
                    height={height}
                    graphHandler={graphHandlerRef}
                />
            }
			<GraphWorkshop isOpen={shouldOpenGraphWorkshop} onClose={() => setShouldOpenGraphWorkshop(false)} graphToEdit={graph}/>
        </div>
    );
};

export default WidgetContainer;

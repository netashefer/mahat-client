import { useState } from "react";
import { useRecoilValue } from "recoil";
import { dataSourcesAtom } from "../../../recoil/dataSources/dataSources";
import { GraphType } from "../../../types/graph.types";
import Dropdown from "../../Common/Dropdown/Dropdown";
import Input from "../../Common/Input/Input";
import './ParametersPanel.scss';

const ParametersPanel = () => {
	const dataSources = useRecoilValue(dataSourcesAtom);
	const [dataSource, setDataSource] = useState('');
	const [graphType, setGraphType] = useState<GraphType | ''>(''); //for the time being all of these are useState
	const [xAxis, setXAxis] = useState('');
	const [yAxis, setYAxis] = useState('');
	const [graphName, setGraphName] = useState('');

	return(
		<div className='parameters-panel'>
			<Dropdown value={dataSource} onChange={setDataSource} label="Data Source" items={dataSources.map(ds => ds.displayName)}/>
			<hr/>
			<Dropdown value={graphType} onChange={setGraphType} label="Graph Type" items={['pie', 'column', 'line']}/>
			<Dropdown value={xAxis} onChange={setXAxis} label="X Axis" items={['a', 'b', 'c']}/>
			<Dropdown value={yAxis} onChange={setYAxis} label="Y Axis" items={['a', 'b', 'c']}/>
			<hr/>
			<Input value={graphName} onChange={setGraphName} label={"Graph Name"}/>
		</div>
	)

}

export default ParametersPanel;
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { SetStateAction, Dispatch } from "react";
import { FieldConfig } from "../../GraphWorkshop/ParametersPanel/chartParametersMapping";
import './Dropdown.scss';

type DropdownProps = {
	value: FieldConfig;
	onChange: Dispatch<SetStateAction<any>>;
	label: string;
	items: FieldConfig[];
};

const Dropdown = ({ label, items, value, onChange }: DropdownProps) => {
	const handleChange = (event: SelectChangeEvent) => {
		const item = items.find(item => item.value === event.target.value);
		onChange(item);
	};

	return (
		<FormControl variant="standard" className='customized-dropdown'>
			<InputLabel id={label} className="input-label">
				{label}
			</InputLabel>
			<Select
				labelId={label}
				value={value?.value}
				onChange={handleChange}
				label={label}
			>
				{items?.map(item =>
					<MenuItem
						className='menu-item'
						value={item?.value}
						key={item?.displayName}>
						{item?.displayName}
					</MenuItem>
				)}
			</Select>
		</FormControl>
	);
};

export default Dropdown;
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import './Dropdown.scss';

type DropdownProps = {
	value: { label: string, value: string; };
	onChange: Dispatch<SetStateAction<any>>;
	label: string;
	items: OptionItem[];
};

export type OptionItem<T = string> = {
	label: string, value: T;
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
						key={item?.label}>
						{item?.label}
					</MenuItem>
				)}
			</Select>
		</FormControl>
	);
};

export default Dropdown;
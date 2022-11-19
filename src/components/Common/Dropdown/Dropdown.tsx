import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { SetStateAction, Dispatch } from "react";
import './Dropdown.scss';

type DropdownProps = {
	value: string;
	onChange: Dispatch<SetStateAction<any>>; 
	label: string;
	items: string[];
}

const Dropdown = ({label, items, value, onChange}: DropdownProps) => {

	const capitalizeFirstLetter = (string: string) => { //move to helpers
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const handleChange = (event: SelectChangeEvent) => {
		onChange(event.target.value);
	};
	
	return(
		<FormControl variant="standard" className='customized-dropdown'>
        	<InputLabel id={label} className="input-label">
				{label}
			</InputLabel>
        	<Select
				labelId={label}
          		value={value}
          		onChange={handleChange}
          		label={label}>
				{items.map(item => 
					<MenuItem 
					className='menu-item'
					value={item} 
					key={item}>
						{capitalizeFirstLetter(item)}
					</MenuItem>
				)}
        	</Select>
      </FormControl>
	)
}

export default Dropdown;
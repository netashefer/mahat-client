import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import './Input.scss';

type InputProps = {
	label: string,
	value: string,
	onChange: Dispatch<SetStateAction<string>>,
}

const Input = ({label, value, onChange}: InputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};	

	return(
		<TextField className="custom-input" label={label} variant="standard" value={value} onChange={handleChange}/>
	)
}

export default Input;
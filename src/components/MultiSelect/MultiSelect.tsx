import { Autocomplete, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

interface MultipleSelectProps {
	label: string;
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (options: string[]) => void;
}

const MultipleSelect = ({ options, setSelectedOptions, selectedOptions = [], label }: MultipleSelectProps) => {
    const handleChange = (e: React.SyntheticEvent, value: string[]) => {
        setSelectedOptions(
            value
        );
    };

    return (
        <FormControl className='custom-form-control' sx={{width: 240, mb: 1.5}}>
			<Autocomplete
        		multiple
        		id="size-small-standard-multi"
        		options={options || []}
				size='small'
				limitTags={3}
				onChange={handleChange}
        		renderInput={(params) => (
          			<TextField
            			{...params}
            			variant="standard"
            			label={label}
          			/>
        		)}
      		/>
        </FormControl>
    );
};

export default MultipleSelect;
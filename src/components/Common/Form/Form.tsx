import { Box, Button, Grid, TextField, TextFieldProps } from "@mui/material";
import './Form.scss';

interface FormProps {
    textFields: TextFieldProps[],
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    submitText: string,
}

const Form = ({textFields, handleSubmit, submitText}: FormProps) => {
    return(
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
            {
                textFields.map(textField => ( 
                    <Grid item xs={12}>
                        <TextField {...textField}/>
                    </Grid>)
                )
            }
        </Grid>
        <Button
        className="form-button"
        type="submit"
        fullWidth
        variant="contained"
        sx={{
        mt: 3,
        mb: 2,
        }}>
            {submitText}
        </Button>
    </Box>);
}

export default Form;
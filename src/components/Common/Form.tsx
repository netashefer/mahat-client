import { Box, Button, Grid, TextField, TextFieldProps } from "@mui/material";

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
                </Grid>))
        }
    </Grid>
    <Button
      className="button1"
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        background: "linear-gradient(to right, #5462E1, #00FFE0)",
      }}
    >
      {submitText}
    </Button>
  </Box>
    );
}

export default Form;
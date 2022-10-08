import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Copyleft from "../../components/Common/Copyleft/Copyleft";
import Form from "../../components/Common/Form/Form";

const SignUpPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });
    //todo: server req
  };

  const userFormConfig = {
    textFields: [{
        required: true,
        fullWidth: true,
        id:"username",
        label:"Username",
        name:"username",
        autoComplete:"username",
    },
    {
        required: true,
        fullWidth: true,
        id:"password",
        label:"Password",
        name:"username",
        autoComplete:"new-password",
    }
    ],
    handleSubmit: handleSubmit,
    submitText: 'Sign Up'
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form {...userFormConfig}/>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signin" variant="body2" color="secondary">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      <Copyleft sx={{ mt: 5 }} />
    </Container>
  );
}

export default SignUpPage;
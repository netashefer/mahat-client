import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Copyleft from "../../components/Common/Copyleft/Copyleft";
import Form from "../../components/Common/Form/Form";

const SignInPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    //todo - req to server
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
        autoComplete:"password",
    }
    ],
    handleSubmit: handleSubmit,
    submitText: 'Sign In'
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
          Sign in
        </Typography>
        <Form {...userFormConfig}/>
        <Grid container justifyContent="flex-end">
      <Grid item>
        <Link href="/signup" variant="body2" color="secondary">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
      </Box>
      <Copyleft sx={{ mt: 5 }} />
    </Container>
  );
}

export default SignInPage;
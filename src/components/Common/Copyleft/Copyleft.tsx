import { Link, Typography, TypographyProps } from "@mui/material";

const Copyleft = (props: TypographyProps) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyleft © "}
        <Link color="inherit" href="https://www.youtube.com/watch?v=cuIKTk_DO4A/">
          Graph.it
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  export default Copyleft;
  
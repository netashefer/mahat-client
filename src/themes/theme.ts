import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0a1929'
        },
        primary: {
            main: '#0d80d8'
        },
        secondary: {
            main: '#03DAC5'
        }
    }
});

export default theme;
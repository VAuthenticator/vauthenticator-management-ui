import {createTheme} from "@mui/material";

const padding = "10px"
const themeProvider = createTheme({
    formInputText: {
        padding: padding
    },
    formButton: {
        padding: padding
    },
    formDatePicker: {
        padding: padding
    },
    palette: {
        primary: {
            main: '#252624',
            contrastText: '#fff',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

export default themeProvider
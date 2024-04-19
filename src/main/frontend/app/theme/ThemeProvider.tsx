import {createTheme} from "@mui/material";

const themeProvider = createTheme({
    palette: {
        primary: {
            main: '#252624',
            contrastText: '#fff',
        }
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    margin: "10px",
                    padding: "10px"
                }
            }
        }
    }
});

export default themeProvider
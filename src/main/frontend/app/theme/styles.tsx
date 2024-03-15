import {Theme} from "@mui/material/styles/createTheme";

const vauthenticatorStyles = (theme: Theme) => {
    return {
        tabs: {
            flexGrow: 1,
            display: 'flex'
        },
        homeMenuItemTitle: {
            textAlign: "center",
        },
        homeMenuItemText: {
            textAlign: "justify",
        },
        homeMenuItemIcon: {
            fontSize: 150
        },
        menuButton: {
            textDecoration: 'none',
            color: 'white',
            paddingLeft: 13
        },
        title: {
            flexGrow: 1,
        },
        contentEditor: {
            minHeight: "200px"
        }
    }
};

export default vauthenticatorStyles
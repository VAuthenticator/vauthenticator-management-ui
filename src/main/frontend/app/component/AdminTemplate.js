import {Container, Link, Paper, ThemeProvider} from "@material-ui/core";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {ExitToApp} from "@material-ui/icons";
import themeProvider from "../theme/ThemeProvider";

export default (props) => {
    let theme = themeProvider

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Link href="#" color="primary">
                        <IconButton edge="start"
                                    color="default"
                                    aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                    </Link>

                    <Typography variant="h6">
                        VAuthenticator Administration {props.page}
                    </Typography>

                    <Link href="/oidc_logout.html">
                        <IconButton edge="start"
                                    color="inherit"
                                    aria-label="menu">
                            <ExitToApp/> Logout
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>

            <Container maxWidth={props.maxWidth}>
                <Paper elevation={3}>
                    {props.children}
                </Paper>
            </Container>
        </ThemeProvider>
    )

}
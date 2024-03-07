import React from "react";
import themeProvider from "../theme/ThemeProvider";
import vauthenticatorStyles from "../theme/styles";
import {AppBar, Container, IconButton, Paper, ThemeProvider, Toolbar, Typography, useTheme} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

export default (props) => {
    let theme = themeProvider
    const classes = vauthenticatorStyles(useTheme());
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <a href="#">
                        <IconButton edge="start"
                                    style={classes.menuButton}
                                    color="default"
                                    aria-label="menu">
                            <MenuIcon style={classes.menuButton}
                                  color="inherit"/>
                        </IconButton>
                    </a>

                    <Typography variant="h6" style={classes.title}>
                        VAuthenticator Administration {props.page}
                    </Typography>

                    <Link href="/oidc_logout.html">
                        <IconButton edge="start"
                                    style={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu">
                            <ExitToApp/> Logout
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>

            <Container maxWidth={props.maxWidth}>
                <Paper style={classes.padding} elevation={3}>
                    {props.children}
                </Paper>
            </Container>
        </ThemeProvider>
    )

}
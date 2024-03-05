import React from "react";
import themeProvider from "../theme/ThemeProvider";
import vauthenticatorStyles from "../theme/styles";
import {AppBar, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";

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
                            <MenuIcon/>
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
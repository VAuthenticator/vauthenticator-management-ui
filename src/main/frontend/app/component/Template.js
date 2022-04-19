import {Container, Paper} from "@material-ui/core";
import React from "react";

export default (props) => {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Container maxWidth={props.maxWidth}>
                <Paper className={classes.padding} elevation={3}>
                    {props.children}
                </Paper>
            </Container>
        </div>
    )
}
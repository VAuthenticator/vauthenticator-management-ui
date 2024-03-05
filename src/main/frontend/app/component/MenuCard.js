import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardHeader, Grid, makeStyles} from "@mui/material";

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        height: 140,
    },
});

export default function MenuCard({title, content, linkTo}) {
    const classes = useStyles();
    return (
        <Grid item xs={4}>
            <Link to={linkTo} style={{textDecoration: 'none'}}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardHeader
                            className={classes.media}

                            title={title}
                        />
                        <CardContent>
                            {content}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    );
}
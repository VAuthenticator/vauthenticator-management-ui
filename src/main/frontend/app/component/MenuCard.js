import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardHeader, Grid} from "@mui/material";

const classes = {
    root: {
        maxWidth: 345
    },
    media: {
        height: 140
    }
}

export default function MenuCard({title, content, linkTo}) {
    return (
        <Grid item xs={4}>
            <Link to={linkTo} style={{textDecoration: 'none'}}>
                <Card style={classes.root}>
                    <CardActionArea>
                        <CardHeader
                            style={classes.media}

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
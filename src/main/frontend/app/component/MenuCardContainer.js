import React from 'react';
import {Grid} from "@mui/material";

export default function MenuCardContainer({children, space}) {
    return <Grid container spacing={space}>
        {children}
    </Grid>
}
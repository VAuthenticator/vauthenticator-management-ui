import React from 'react';
import {Grid} from "@mui/material";

export default function MenuCardContainer({children}) {
    return <Grid container spacing={2}>
        {children}
    </Grid>
}
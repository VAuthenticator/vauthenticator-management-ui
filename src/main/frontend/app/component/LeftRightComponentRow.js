import React from "react";
import {Grid} from "@mui/material";

export default function LeftRightComponentRow({leftComponents, leftComponentColumnsSize, rightComponents, rightComponentsColumnSize}) {

    return <Grid container sm={12}>
        <Grid item sm={leftComponentColumnsSize}>
            {leftComponents}
        </Grid>

        <Grid item sm={12 - leftComponentColumnsSize - rightComponentsColumnSize}>
        </Grid>

        <Grid item sm={rightComponentsColumnSize}>
            {rightComponents}
        </Grid>
    </Grid>

}

import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@mui/material";

export default function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            style={{width: "100%"}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

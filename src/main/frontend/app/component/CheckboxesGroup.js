import React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));
// choicesRegistry = [{name, checked, label}, ...]
export default function CheckboxesGroup({id, legend, choicesRegistry, handler}) {
    const classes = useStyles()
    const choicesRegistryKeys = Object.keys(choicesRegistry)
    return (
        <div className={classes.root}>
            <FormControl id={id} name={id} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{legend}</FormLabel>
                <FormGroup>
                    {choicesRegistryKeys.map(choiceKey => {
                        return <FormControlLabel
                                control={<Checkbox checked={choicesRegistry[choiceKey]} onChange={handler} name={choiceKey}/>}
                                label={choiceKey}
                            />
                        }
                    )}
                </FormGroup>
            </FormControl>
        </div>
    );
}
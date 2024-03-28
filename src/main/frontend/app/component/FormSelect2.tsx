import React, {MouseEventHandler} from "react"
import Select from "react-select";
import {Grid, OutlinedInput} from "@mui/material";
import {OptionsOrGroups} from "react-select/dist/declarations/src/types";

interface FormSelectProps {
    id: string
    label: string
    multi: boolean
    options: OptionsOrGroups<string, string>
    value: string
    onChangeHandler: (...args: any) => void | MouseEventHandler<HTMLButtonElement>
    suffix: string
}

const FormSelect2: React.FC<FormSelectProps> = ({id, label, multi, options, value, onChangeHandler, suffix}) => {
    return <Grid container spacing={8} alignItems="flex-end">
        {suffix && <Grid item>
            {suffix}
        </Grid>}
        <Grid item md={true} sm={true} xs={true}>

            <Select
                menuPortalTarget={document.body}
                styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                isMulti={multi}
                id={id}
                value={value}

                options={options}
                onChange={onChangeHandler}
                input={<OutlinedInput/>}/>
        </Grid>
    </Grid>

}

export default FormSelect2
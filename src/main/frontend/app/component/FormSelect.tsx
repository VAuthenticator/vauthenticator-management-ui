import React from "react"
import Select from "react-select";
import {Grid, InputLabel} from "@mui/material";
import {GroupBase, OptionsOrGroups} from "react-select/dist/declarations/src/types";

interface SelectOption {
    value: string
    label: string
}
interface FormSelectProps {
    id: string
    label: string
    multi: boolean
    options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>
    value?: SelectOption
    onChangeHandler: (...args: any) => void
    suffix?: string
}

const FormSelect: React.FC<FormSelectProps> = ({id, label, multi, options, value, onChangeHandler, suffix}) => {
    return <Grid container spacing={8} alignItems="flex-end">
        {suffix && <Grid item>
            {suffix}
        </Grid>}
        <Grid item md={true} sm={true} xs={true}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                menuPortalTarget={document.body}
                styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                isMulti={multi}
                id={id}
                value={value}

                options={options}
                onChange={onChangeHandler}/>
        </Grid>
    </Grid>

}

export default FormSelect
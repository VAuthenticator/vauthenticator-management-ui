import React from "react";
import StickyHeadTable from "./StickyHeadTable";
import {Checkbox, FormControlLabel} from "@mui/material";

export const drawAuthorityRows = (setAuthorityRows, setAuthorities, clientAppAuthorities, allRole) => allRole.map(role => {
    return {
        name: role.name,
        description: role.description,
        delete: <FormControlLabel control={
            <Checkbox onChange={() => {
                const roleIndex = clientAppAuthorities.indexOf(role.name)

                if (roleIndex !== -1) {
                    clientAppAuthorities.splice(roleIndex, 1)
                } else {
                    clientAppAuthorities.push(role.name)
                }

                setAuthorities(clientAppAuthorities)
                setAuthorityRows(drawAuthorityRows(setAuthorityRows, setAuthorities, clientAppAuthorities, allRole))
            }}
                      checked={clientAppAuthorities.indexOf(role.name) !== -1}/>
        }/>
    }
})


export default ({columns, authorityRows}) => {
    return <StickyHeadTable columns={columns} rows={authorityRows}/>
}
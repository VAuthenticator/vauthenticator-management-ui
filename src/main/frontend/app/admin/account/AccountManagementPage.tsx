import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import FormInputTextField from "../../component/FormInputTextField";
import AdminTemplate from "../../component/AdminTemplate";
import Separator from "../../component/Separator";
import CheckboxesGroup from "../../component/CheckboxesGroup";
import {findAccountFor, saveAccountFor} from "./AccountRepository";
import FormButton from "../../component/FormButton";
import {findAllRoles} from "../roles/RoleRepository";
import AuthorityTable, {drawAuthorityRows} from "../../component/AuthorityTable";
import LeftRightComponentRow from "../../component/LeftRightComponentRow";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {PeopleAlt} from "@mui/icons-material";

const columns = [
    {id: 'name', label: 'Role', minWidth: 170},
    {id: 'description', label: 'Description Role', minWidth: 170},
    {id: 'delete', label: 'Delete Role', minWidth: 170}
];

export default () => {
    let {accountMail} = useParams<string>()!;
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>(accountMail!)
    const [enabled, setEnabled] = useState({enabled: false})
    const [accountLocked, setAccountLocked] = useState({accountLocked: false})
    const [authorities, setAuthorities] = useState<string[]>([])
    const [authorityRows, setAuthorityRows] = useState([])

    let pageTitle = "Account Management";

    useEffect(() => {
            findAllRoles()
                .then(roleValues => {
                    findAccountFor(email!)
                        .then(value => {
                            if (value) {
                                setEnabled({enabled: value.enabled})
                                setAccountLocked({accountLocked: value.accountLocked})
                                setAuthorities(value.authorities)
                                setAuthorityRows(
                                    drawAuthorityRows(setAuthorityRows, setAuthorities, value.authorities, roleValues)
                                )
                            } else {
                                navigate(-1)
                            }
                        })
                })
        }, []
    )

    const save = () => {
        const account = {
            email: email,
            enabled: enabled.enabled,
            accountLocked: accountLocked.accountLocked,
            authorities: authorities
        }

        saveAccountFor(account)
            .then(response => {
                if (response.status === 204) {
                    navigate(-1);
                }
            })
    }

    return (
        <AdminTemplate maxWidth="xl" page={pageTitle}>

            <Typography variant="h3" component="h3">
                <PeopleAlt fontSize="large"/> Account mail: {accountMail}
            </Typography>

            <Card>
                <CardHeader title="Account definition" color="textSecondary"/>
                <CardContent>
                    <FormInputTextField id="email"
                                        label="Account Mail"
                                        required={true}
                                        disabled={true}
                                        handler={(value) => {
                                            setEmail(value.target.value)
                                        }}
                                        value={email}/>

                    <CheckboxesGroup id="enabled"
                                     handler={(value) => {
                                         setEnabled({enabled: value.target.checked})
                                     }}
                                     choicesRegistry={enabled}
                                     legend="Account Enabled"/>

                    <CheckboxesGroup id="accountLocked"
                                     handler={(value) => {
                                         setAccountLocked({accountLocked: value.target.checked})
                                     }}
                                     choicesRegistry={accountLocked}
                                     legend="Account Locked"/>

                    <AuthorityTable authorityRows={authorityRows} columns={columns}/>

                    <Separator/>

                    <LeftRightComponentRow leftComponentColumnsSize={2}
                                           leftComponents={<FormButton label="Back"
                                                                       onClickHandler={() => navigate(-1)}/>}

                                           rightComponentsColumnSize={2}
                                           rightComponents={<FormButton label="Save" direction="rtl"
                                                                        onClickHandler={save}/>}
                    />

                </CardContent>
            </Card>

        </AdminTemplate>
    );
}
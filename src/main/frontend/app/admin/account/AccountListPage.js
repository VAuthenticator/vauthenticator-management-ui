import React, {useEffect, useState} from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import StickyHeadTable from "../../component/StickyHeadTable";
import EditIcon from "@material-ui/icons/Edit";
import {findAllAccounts} from "./AccountRepository";
import Checkbox from "@material-ui/core/Checkbox";
import {useNavigate} from "react-router";

const columns = [
    {id: 'email', label: 'E-Mail', minWidth: 170},
    {id: 'enabled', label: 'Enabled', minWidth: 170},
    {id: 'accountLocked', label: 'Account Locked', minWidth: 170},
    {id: 'edit', label: 'Edit', minWidth: 170},
];

export default () => {
    const pageTitle = "Account Management"
    const [accounts, setAccounts] = useState([])

    const navigate = useNavigate();

    const getEditLinkFor = (accountMail) => {
        return <EditIcon onClick={() => {
            navigate(`/accounts/edit/${accountMail}`)
        }}/>
    }

    const fetchAllAccounts = () => {
        findAllAccounts()
            .then(values => {
                let rows = values.map(value => {
                    return {
                        email: value.email,
                        enabled: <Checkbox color="primary" checked={value.enabled}/>,
                        accountLocked: <Checkbox color="primary" checked={value.accountLocked}/>,
                        edit: getEditLinkFor(value["email"]),
                    }
                })

                setAccounts(rows)
            });
    }

    useEffect(() => {
        fetchAllAccounts()
    }, []);

    return <AdminTemplate maxWidth="xl" page={pageTitle}>
        <StickyHeadTable columns={columns} rows={accounts}/>
    </AdminTemplate>

}
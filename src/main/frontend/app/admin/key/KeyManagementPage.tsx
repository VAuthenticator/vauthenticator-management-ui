import React, {SyntheticEvent, useEffect} from 'react';
import {deleteKeyFor, findAllKeys, VAuthenticatorKey} from "./KeyRepository";
import StickyHeadTable from "../../component/StickyHeadTable";
import AdminTemplate from "../../component/AdminTemplate";
import {Alert, Snackbar} from "@mui/material";
import {Delete} from "@mui/icons-material";

const columns = [
    {id: 'masterKey', label: 'Maser Key', minWidth: 170},
    {id: 'kid', label: 'Key Id', minWidth: 170},
    {id: 'delete', label: 'Delete Key', minWidth: 170}
];

const KeysManagementPage = () => {
    const pageTitle = "Keys Management"
    const [keys, setKeys] = React.useState([])
    const [openFailure, setOpenFailure] = React.useState(false);
    const handleClose = (event: SyntheticEvent<Element, Event>) => {
        setOpenFailure(false);
    };

    const getDeleteLinkFor = (kid : string) => {
        return <Delete onClick={() => {
            deleteKeyFor(kid)
                .then(response => {
                    if (response.status === 204) {
                        fetchAllKeys()
                    } else {
                        setOpenFailure(true);
                    }
                })
        }}/>;
    }
    const fetchAllKeys = () => {
        findAllKeys()
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    setKeys([])
                }
            })
            .then(val => {
                let rows = val.map((value : VAuthenticatorKey) => {
                    return {
                        masterKey: value.masterKey,
                        kid: value.kid,
                        delete: getDeleteLinkFor(value.kid)
                    }
                })
                setKeys(rows)
            })
    }

    useEffect(() => {
        fetchAllKeys()
    }, []);

    return (
        <AdminTemplate maxWidth="xl" page={pageTitle}>
            <Snackbar open={openFailure} autoHideDuration={6000}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Delete this key is not allowed
                </Alert>
            </Snackbar>
            <StickyHeadTable columns={columns} rows={keys}/>
        </AdminTemplate>
    )
}

export default KeysManagementPage
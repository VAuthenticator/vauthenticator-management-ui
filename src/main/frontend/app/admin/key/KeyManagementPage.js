import React, {useEffect} from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import {Delete} from "@material-ui/icons";
import {deleteKeyFor, findAllKeys} from "./KeyRepository";
import StickyHeadTable from "../../component/StickyHeadTable";

const columns = [
    {id: 'masterKey', label: 'Maser Key', minWidth: 170},
    {id: 'kid', label: 'Key Id', minWidth: 170},
    {id: 'delete', label: 'Delete Key', minWidth: 170}
];

const KeysManagementPage = () => {
    const pageTitle = "Keys Management"
    const [keys, setKeys] = React.useState([])

    const getDeleteLinkFor = (kid) => {
        return <Delete onClick={() => {
            deleteKeyFor(kid)
                .then(response => {
                    if (response.status === 204) {
                        fetchAllKeys()
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
                let rows = val.map(value => {
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
            <StickyHeadTable columns={columns} rows={keys}/>
        </AdminTemplate>
    )
}

export default KeysManagementPage
import React, {useEffect} from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import {Delete} from "@material-ui/icons";
import {deleteKeyFor, findAllKeys} from "./KeyRepository";
import StickyHeadTable from "../../component/StickyHeadTable";
import ConfirmationDialog from "../../component/ConfirmationDialog";

const columns = [
    {id: 'masterKey', label: 'Maser Key', minWidth: 170},
    {id: 'kid', label: 'Key Id', minWidth: 170},
    {id: 'delete', label: 'Delete Key', minWidth: 170}
];

const KeysManagementPage = () => {
    const pageTitle = "Keys Management"
    const [keys, setKeys] = React.useState([])
    const [openConfirmationDeleteKeyDialog, setOpenConfirmationDeleteKeyDialog] = React.useState(false)
    const handleCloseConfirmationDialog = (refresh) => {
        setOpenConfirmationDeleteKeyDialog(false);
        if (refresh) {
            fetchAllKeys();
        }
    };

    const deleteKey = (kid) => deleteKeyFor(kid)
        .then(response => {
            if (response.status === 204) {
                fetchAllKeys()
            }
        })

    const getDeleteLinkFor = (kid) => {
        return <Delete onClick={() => {
            deleteKey(kid)
                .then(_ => {
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
            <ConfirmationDialog maxWidth="md"
                                open={openConfirmationDeleteKeyDialog}
                                onExecute={deleteKey}
                                onClose={handleCloseConfirmationDialog}
                                message="Are you sure delete the selected key"
                                title="Key delete"/>
        </AdminTemplate>
    )
}

export default KeysManagementPage
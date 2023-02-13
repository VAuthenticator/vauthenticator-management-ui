import React, {useEffect} from 'react';
import AdminTemplate from "../../component/AdminTemplate";

const columns = [
    {id: 'name', label: 'Role', minWidth: 170},
    {id: 'description', label: 'Description', minWidth: 170},
    {id: 'edit', label: 'Edit Role', minWidth: 170},
    {id: 'delete', label: 'Delete Role', minWidth: 170}
];

const KeysManagementPage = () => {
    const pageTitle = "Keys Management"

    useEffect(() => {
    }, []);

    return (
        <AdminTemplate maxWidth="xl" page={pageTitle}>

        </AdminTemplate>
    )
}

export default KeysManagementPage
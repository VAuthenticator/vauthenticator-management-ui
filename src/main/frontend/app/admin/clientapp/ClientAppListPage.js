import React, {useEffect} from 'react';
import {withStyles} from "@material-ui/core";
import {Apps, Delete, VpnKey} from "@material-ui/icons";
import vauthenticatorStyles from "../../component/styles";
import StickyHeadTable from "../../component/StickyHeadTable";
import {deleteClientApplicationFor, findAllClientApplications} from "./ClientAppRepository";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import AdminTemplate from "../../component/AdminTemplate";
import FormButton from "../../component/FormButton";
import ResetClientAppSecretDialog from "./ResetClientAppSecretDialog";
import {useHistory} from "react-router";

const columns = [
    {id: 'clientAppName', label: 'Client Application Name', minWidth: 170},
    {id: 'clientAppId', label: 'Client Application Id', minWidth: 170},
    {id: 'scopes', label: 'Client Scopes', minWidth: 170},
    {id: 'authorizedGrantTypes', label: 'Client Application Autorized Grant Type', minWidth: 170},
    {id: 'edit', label: 'Edit Application', minWidth: 170},
    {id: 'delete', label: 'Delete Application', minWidth: 170},
    {id: 'secretKey', label: 'Reset Password', minWidth: 170}
];

const ClientAppManagementPage = withStyles(vauthenticatorStyles)((props) => {
    const {classes} = props;
    const [applications, setApplications] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [currentClientAppId, setCurrentClientAppId] = React.useState("")

    const history = useHistory()

    const getEditLinkFor = (clientAppId) => {
        return <EditIcon onClick={() => {
            history.push( `/client-applications/edit/${clientAppId}`)
        }}/>
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getDeleteLinkFor = (clientAppId) => {
        return <Delete onClick={() => {
            deleteClientApplicationFor(clientAppId)
                .then(response => {
                    if (response.status === 204) {
                        fetchAllApplications()
                    }
                })
        }}/>;
    }
    const resetSecretKeyFor = (clientAppId) => {
        return <VpnKey onClick={() => {
            setOpen(true)
            setCurrentClientAppId(clientAppId)
        }}/>;
    }

    const fetchAllApplications = () => {
        findAllClientApplications()
            .then(val => {
                let rows = val.map(value => {
                    value.scopes = value.scopes.join(",")
                    value.authorizedGrantTypes = value.authorizedGrantTypes.join(",")
                    value.edit = getEditLinkFor(value["clientAppId"])
                    value.delete = getDeleteLinkFor(value["clientAppId"])
                    value.secretKey = resetSecretKeyFor(value["clientAppId"])
                    return value
                })
                setApplications(rows)
            });
    }

    useEffect(() => {
        fetchAllApplications()
    }, []);

    return (
        <AdminTemplate maxWidth="xl" classes={classes} page=": Client Application Admin">
            <ResetClientAppSecretDialog open={open} onClose={handleClose} clientAppId={currentClientAppId}/>

            <Link to={"/client-applications/save"}>
                <FormButton type="button"
                            labelPrefix={<Apps fontSize="large"/>}
                            label={"New Client Application"}/>
            </Link>

            <StickyHeadTable columns={columns} rows={applications}/>

        </AdminTemplate>
    );
})

export default ClientAppManagementPage
import React, {useState} from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import StickyHeadTable from "../../component/StickyHeadTable";
import {useNavigate} from "react-router";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormInputTextField from "../../component/FormInputTextField";
import Separator from "../../component/Separator";
import FormButton from "../../component/FormButton";

const columns = [
    {id: 'email', label: 'E-Mail', minWidth: 170},
    {id: 'enabled', label: 'Enabled', minWidth: 170},
    {id: 'accountLocked', label: 'Account Locked', minWidth: 170},
    {id: 'edit', label: 'Edit', minWidth: 170},
];

export default () => {
    const pageTitle = "Account Management"
    const [accounts, setAccounts] = useState([])
    const [email, setEmail] = useState("")

    const navigate = useNavigate();

   /* const getEditLinkFor = (accountMail) => {
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
*/
    return <AdminTemplate maxWidth="xl" page={pageTitle}>
        <Card>
            <CardHeader title="Account Search" color="textSecondary"/>
            <CardContent>
                <FormInputTextField id="email"
                                    label="Account Mail"
                                    required={true}
                                    disabled={false}
                                    handler={(value) => {
                                        setEmail(value.target.value)
                                    }}
                                    value={email}/>


                <Separator/>
                <FormButton label="Find" onClickHandler={() => navigate(`/accounts/edit/${email}`)}/>
            </CardContent>
        </Card>
        <StickyHeadTable columns={columns} rows={accounts}/>
    </AdminTemplate>

}
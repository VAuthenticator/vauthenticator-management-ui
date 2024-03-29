import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {findClientApplicationFor, saveClientApplicationFor} from "./ClientAppRepository";
import FormInputTextField from "../../component/FormInputTextField";
import AdminTemplate from "../../component/AdminTemplate";
import Separator from "../../component/Separator";
import FormButton from "../../component/FormButton";
import TabPanel from "../../component/TabPanel";
import LeftRightComponentRow from "../../component/LeftRightComponentRow";
import CheckboxesGroup from "../../component/CheckboxesGroup";
import {authorizedGrantTypesParam, authorizedGrantTypesRegistry} from "./AuthorizedGrantTypes";
import {findAllRoles} from "../roles/RoleRepository";
import AuthorityTable, {drawAuthorityRows} from "../../component/AuthorityTable";
import vauthenticatorStyles from "../../theme/styles";
import FormSelect from "../../component/FormSelect";
import {findAllScopes} from "./ScopeRepository";
import {Box, Card, CardContent, CardHeader, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {Apps} from "@mui/icons-material";

function allProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const columns = [
    {id: 'name', label: 'Role', minWidth: 170},
    {id: 'description', label: 'Description Role', minWidth: 170},
    {id: 'delete', label: 'Delete Role', minWidth: 170}
];

const ClientAppManagementPage = () => {
    const classes = vauthenticatorStyles(useTheme());
    let {clientAppId} = useParams();
    const storePassword = !clientAppId
    const navigate = useNavigate();

    const [clientApplicationId, setClientApplicationId] = useState(clientAppId)
    const [clientAppName, setClientAppName] = useState("")
    const [secret, setSecret] = useState("*********")
    const [scopes, setScopes] = useState([])
    const [availableScopes, setAvailableScopes] = useState([])
    const [authorizedGrantTypes, setAuthorizedGrantTypes] = useState(authorizedGrantTypesRegistry)
    const [webServerRedirectUri, setWebServerRedirectUri] = useState("")
    const [withPkce, setWithPkce] = useState(false)

    const [authorities, setAuthorities] = useState([])
    const [authorityRows, setAuthorityRows] = useState([])

    const [accessTokenValidity, setAccessTokenValidity] = useState("")
    const [refreshTokenValidity, setRefreshTokenValidity] = useState("")
    const [postLogoutRedirectUri, setPostLogoutRedirectUri] = useState("")
    const [logoutUri, setLogoutUri] = useState("")

    const saveClientApp = () => {
        let clientApplication = {
            "clientAppName": clientAppName,
            "secret": secret,
            "scopes": scopes.map(scope => scope.value),
            "authorizedGrantTypes": authorizedGrantTypesParam(authorizedGrantTypes),
            "withPkce": withPkce,
            "webServerRedirectUri": webServerRedirectUri,
            "authorities": authorities,
            "accessTokenValidity": accessTokenValidity,
            "refreshTokenValidity": refreshTokenValidity,
            "postLogoutRedirectUri": postLogoutRedirectUri,
            "logoutUri": logoutUri,
            "storePassword": storePassword
        }
        saveClientApplicationFor(clientApplicationId, clientApplication)
            .then(response => {
                if (response.status === 204) {
                    navigate(-1);
                }
            })
    }

    useEffect(() => {
        findAllScopes()
            .then(scopes => {
                    setAvailableScopes(scopes.map(scope => {
                        return {value: scope, label: scope}
                    }))
                }
            )

        findAllRoles()
            .then(roleValues => {
                findClientApplicationFor(clientApplicationId)
                    .then(clientApp => {
                        try {
                            setClientAppName(clientApp.clientAppName)
                            setSecret(clientApp.secret)
                            setScopes(clientApp.scopes.map(scope => {
                                return {value: scope, label: scope};
                            }))
                            setAuthorizedGrantTypes(authorizedGrantTypesRegistry(clientApp.authorizedGrantTypes))
                            setWithPkce(clientApp.withPkce)
                            setWebServerRedirectUri(clientApp.webServerRedirectUri)
                            setAccessTokenValidity(clientApp.accessTokenValidity)
                            setRefreshTokenValidity(clientApp.refreshTokenValidity)
                            setPostLogoutRedirectUri(clientApp.postLogoutRedirectUri)
                            setLogoutUri(clientApp.logoutUri)

                            setAuthorities(clientApp.authorities)
                        } catch (e) {

                        }

                        setAuthorityRows(
                            drawAuthorityRows(setAuthorityRows, setAuthorities, getClientAppAuthorities(clientApp), roleValues)
                        )
                    })
            })
    }, [])
    const [value, setValue] = React.useState('0');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let getClientAppAuthorities = (clientApp) => {
        if (clientApp) {
            return clientApp.authorities || []
        } else {
            return []
        }
    }

    let pageTitle = clientApplicationId ? `: Client Application: ${clientApplicationId}` : "";
    return <AdminTemplate maxWidth="xl" age={pageTitle}>

        <Typography variant="h3" component="h3">
            <Apps fontSize="large"/> Client Application: {clientApplicationId}
        </Typography>

        <Box style={classes.tabs}>
            <Tabs value={value}
                  orientation="vertical"
                  onChange={handleChange}
                  aria-label="wrapped label tabs example">
                <Tab value="0"
                     label="1) Client Application Credentials Section"
                     wrapped
                     {...allProps('0')}
                />
                <Tab value="1"
                     label="2) Client Application Permission Definition Section"
                     {...allProps('1')} />

                <Tab value="2"
                     label="3) Client Application Uri Section"
                     {...allProps('2')} />
            </Tabs>
            <TabPanel value={value} index={'0'}>
                <Card>
                    <CardHeader title="Client Application base definition" color="textSecondary"/>
                    <CardContent>
                        <FormInputTextField id="clientAppId"
                                            label="Client Application Id"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplicationId(value.target.value)
                                            }}
                                            value={clientApplicationId || ""}/>

                        <FormInputTextField id="secret"
                                            label="Password"
                                            required={true}
                                            type="Password"
                                            disabled={clientAppId}
                                            handler={(value) => {
                                                setSecret(value.target.value)
                                            }}
                                            value={secret}/>

                        <FormInputTextField id="clientAppName"
                                            label="Client Application Displayed Name"
                                            required={true}
                                            handler={(value) => {
                                                setClientAppName(value.target.value)
                                            }}
                                            value={clientAppName}/>
                    </CardContent>
                </Card>

                <Separator/>

                <LeftRightComponentRow leftComponentColumnsSize={2}
                                       leftComponents={<FormButton label="Next Tab"
                                                                   onClickHandler={() => setValue('1')}/>}
                                       rightComponentsColumnSize={2}
                                       rightComponents={<FormButton label="Save Client Application" direction="rtl"
                                                                    onClickHandler={saveClientApp}/>}/>
            </TabPanel>

            <TabPanel value={value} index={'1'}>
                <Card>
                    <CardContent>
                        <CardHeader title="Client Application permission specification" color="textSecondary"/>

                        <FormSelect id="scopes"
                                    label="Scopes"
                                    multi={true}
                                    onChangeHandler={(event) => {
                                        setScopes(event)
                                    }}
                                    options={availableScopes}
                                    value={scopes}/>

                        <CheckboxesGroup id="withPkce"
                                         handler={(value) => {
                                             setWithPkce(value.target.checked)
                                         }}
                                         choicesRegistry={{
                                             with_pkce: withPkce
                                         }}
                                         legend="Enable/Disable PKCE"/>

                        <CheckboxesGroup id="authorizedGrantTypes"
                                         handler={(value) => {
                                             setAuthorizedGrantTypes({
                                                 ...authorizedGrantTypes,
                                                 [value.target.name]: value.target.checked
                                             })
                                         }}
                                         choicesRegistry={authorizedGrantTypes}
                                         legend="Authorized Grant Types"/>


                        <FormInputTextField id="accessTokenValidity"
                                            label="Access Token Validity"
                                            required={true}
                                            handler={(value) => {
                                                setAccessTokenValidity(value.target.value)
                                            }}
                                            value={accessTokenValidity}/>

                        <FormInputTextField id="refreshTokenValidity"
                                            label="Refresh Token Validity"
                                            required={true}
                                            handler={(value) => {
                                                setRefreshTokenValidity(value.target.value)
                                            }}
                                            value={refreshTokenValidity}/>

                        <AuthorityTable columns={columns} authorityRows={authorityRows}/>
                    </CardContent>
                </Card>
                <Separator/>

                <LeftRightComponentRow leftComponentColumnsSize={2}
                                       leftComponents={
                                           <div style={{
                                               flex: "0 0 auto",
                                               display: "flex",
                                           }}>
                                               <FormButton label="Previous Tab"
                                                           onClickHandler={() => setValue('0')}/>
                                               <FormButton label="Next Tab" onClickHandler={() => setValue('2')}/>
                                           </div>
                                       }
                                       rightComponentsColumnSize={2}
                                       rightComponents={<FormButton label="Save Client Application" direction="rtl"
                                                                    onClickHandler={saveClientApp}/>}/>

            </TabPanel>
            <TabPanel value={value} index={'2'}>
                <Card>
                    <CardContent>
                        <CardHeader title="Client Application urls definitions" color="textSecondary"/>

                        <FormInputTextField id="webServerRedirectUri"
                                            label="Web Server Redirect Uri"
                                            required={true}
                                            handler={(value) => {
                                                setWebServerRedirectUri(value.target.value)
                                            }}
                                            value={webServerRedirectUri}/>

                        <FormInputTextField id="postLogoutRedirectUri"
                                            label="Post Logout Redirect Uri"
                                            required={true}
                                            handler={(value) => {
                                                setPostLogoutRedirectUri(value.target.value)
                                            }}
                                            value={postLogoutRedirectUri}/>

                        <FormInputTextField id="logoutUri"
                                            label="Logout Uri"
                                            required={true}
                                            handler={(value) => {
                                                setLogoutUri(value.target.value)
                                            }}
                                            value={logoutUri}/>
                    </CardContent>
                </Card>
                <Separator/>
                <LeftRightComponentRow leftComponentColumnsSize={2}
                                       leftComponents={<FormButton label="Previous Tab"
                                                                   onClickHandler={() => setValue('1')}/>}
                                       rightComponentsColumnSize={2}
                                       rightComponents={<FormButton label="Save Client Application" direction="rtl"
                                                                    onClickHandler={saveClientApp}/>}/>
            </TabPanel>
        </Box>
    </AdminTemplate>
}

export default ClientAppManagementPage
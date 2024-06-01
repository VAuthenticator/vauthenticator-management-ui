import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {ClientApplicationDetails, findClientApplicationFor, saveClientApplicationFor} from "./ClientAppRepository";
import FormInputTextField from "../../component/FormInputTextField";
import AdminTemplate from "../../component/AdminTemplate";
import Separator from "../../component/Separator";
import FormButton from "../../component/FormButton";
import TabPanel from "../../component/TabPanel";
import LeftRightComponentRow from "../../component/LeftRightComponentRow";
import CheckboxesGroup from "../../component/CheckboxesGroup";
import {AuthorizedGrantType, authorizedGrantTypesParam, authorizedGrantTypesRegistry} from "./AuthorizedGrantTypes";
import vauthenticatorStyles from "../../theme/styles";
import FormSelect, {SelectOption} from "../../component/FormSelect";
import {findAllScopes} from "./ScopeRepository";
import {Box, Card, CardContent, CardHeader, Tab, Tabs, Typography} from "@mui/material";
import {Apps} from "@mui/icons-material";

function allProps(index: string) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ClientAppManagementPage = () => {
    const classes = vauthenticatorStyles();
    let {clientAppId} = useParams();
    const storePassword = !clientAppId
    const navigate = useNavigate();

    const [clientApplicationId, setClientApplicationId] = useState<string | undefined>(clientAppId)
    const [clientAppName, setClientAppName] = useState("")
    const [secret, setSecret] = useState("*********")
    const [scopes, setScopes] = useState<SelectOption[]>([])
    const [availableScopes, setAvailableScopes] = useState<SelectOption[]>([])
    const [authorizedGrantTypes, setAuthorizedGrantTypes] = useState(authorizedGrantTypesRegistry([]))
    const [webServerRedirectUri, setWebServerRedirectUri] = useState("")
    const [withPkce, setWithPkce] = useState(false)

    const [accessTokenValidity, setAccessTokenValidity] = useState("")
    const [refreshTokenValidity, setRefreshTokenValidity] = useState("")
    const [postLogoutRedirectUri, setPostLogoutRedirectUri] = useState("")
    const [logoutUri, setLogoutUri] = useState("")


    const saveClientApp = () => {
        console.log("authorizedGrantTypes " + JSON.stringify(authorizedGrantTypes))
        console.log("authorizedGrantTypesParam(authorizedGrantTypes) " +authorizedGrantTypesParam(authorizedGrantTypes))
        let clientApplication: ClientApplicationDetails = {
            clientAppName: clientAppName,
            secret: secret,
            withPkce: withPkce,
            storePassword: storePassword,
            scopes: scopes.map(scope => scope.value),
            authorizedGrantTypes: authorizedGrantTypesParam(authorizedGrantTypes),
            webServerRedirectUri: webServerRedirectUri,
            accessTokenValidity: accessTokenValidity,
            refreshTokenValidity: refreshTokenValidity,
            postLogoutRedirectUri: postLogoutRedirectUri,
            logoutUri: logoutUri
        }

        saveClientApplicationFor(clientApplicationId!!, clientApplication)
            .then(response => {
                if (response.status === 204) {
                    navigate(-1);
                }
            })
    }

    useEffect(() => {
        async function init() {
            let scopes = await findAllScopes()
            console.log("scopes: " + scopes)
            setAvailableScopes(scopes.map(scope => {
                return {value: scope, label: scope}
            }))

            let clientApp = await findClientApplicationFor(clientApplicationId!!)

            setClientAppName(clientApp.clientAppName)
            setSecret(clientApp.secret)
            setScopes(clientApp.scopes.map(scope => {
                return {value: scope, label: scope};
            }))
            setAuthorizedGrantTypes(authorizedGrantTypesRegistry(clientApp.authorizedGrantTypes as AuthorizedGrantType[]))
            setWithPkce(clientApp.withPkce)
            setWebServerRedirectUri(clientApp.webServerRedirectUri)
            setAccessTokenValidity(clientApp.accessTokenValidity)
            setRefreshTokenValidity(clientApp.refreshTokenValidity)
            setPostLogoutRedirectUri(clientApp.postLogoutRedirectUri)
            setLogoutUri(clientApp.logoutUri)
        }

        init()
    }, [])
    const [value, setValue] = React.useState('0');
    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };

    let pageTitle = clientApplicationId ? `: Client Application: ${clientApplicationId}` : "";
    return <AdminTemplate maxWidth="xl" page={pageTitle}>

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
                                            disabled={clientAppId != undefined}
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
                                             console.log(authorizedGrantTypes)
                                             console.log(authorizedGrantTypes)
                                             console.log(JSON.stringify(authorizedGrantTypes))
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
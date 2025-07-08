import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {
    ClientApplicationDetails,
    findClientApplicationFor,
    newClientApplicationRandomSecret,
    saveClientApplicationFor
} from "../ClientAppRepository";
import FormInputTextField from "../../../component/FormInputTextField";
import AdminTemplate from "../../../component/AdminTemplate";
import Separator from "../../../component/Separator";
import FormButton from "../../../component/FormButton";
import TabPanel from "../../../component/TabPanel";
import LeftRightComponentRow from "../../../component/LeftRightComponentRow";
import CheckboxesGroup from "../../../component/CheckboxesGroup";
import {
    AuthorizedGrantType,
    authorizedGrantTypesParam,
    authorizedGrantTypesRegistry,
    ClientAppAuthorizedGrantType
} from "../AuthorizedGrantTypes";
import vauthenticatorStyles from "../../../theme/styles";
import FormSelect, {SelectOption} from "../../../component/FormSelect";
import {findAllScopes} from "../ScopeRepository";
import {Alert, Box, Card, CardContent, CardHeader, Snackbar, Tab, Tabs, Typography} from "@mui/material";
import {Apps, Autorenew, ContentCopy} from "@mui/icons-material";
import randomClientApplicationIdGenerator from "../RandomClientApplicationIdGenerator";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import copy from "copy-to-clipboard";

type ClientApplicationPageDetailsSelect = {
    value: string
    label: string
}
type ClientApplicationPageDetails = {
    clientApplicationId: string | undefined
    clientAppName: string
    secret: string
    applicationType: SelectOption
    scopes: SelectOption[]
    authorizedGrantTypes: ClientAppAuthorizedGrantType
    webServerRedirectUri: string
    allowedOrigins: string
    withPkce: boolean
    accessTokenValidity: string
    refreshTokenValidity: string
    postLogoutRedirectUri: string
    logoutUri: string
}

function newClientApplicationPageDetails(
    clientAppId: string | undefined,
    authorizedGrantType: ClientAppAuthorizedGrantType
): ClientApplicationPageDetails {
    return {
        clientApplicationId: clientAppId,
        clientAppName: "",
        secret: "",
        applicationType: CONFIDENTIAL_CLIENT_APP_TYPE,
        scopes: [],
        authorizedGrantTypes: authorizedGrantType,
        webServerRedirectUri: "",
        allowedOrigins: "",
        withPkce: false,
        accessTokenValidity: "",
        refreshTokenValidity: "",
        postLogoutRedirectUri: "",
        logoutUri: ""
    }
}

function allProps(index: string) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const CONFIDENTIAL_CLIENT_APP_TYPE = {value: "true", label: "CONFIDENTIAL"}
const PUBLIC_CLIENT_APP_TYPE = {value: "false", label: "PUBLIC"}

function isClientApplicationConfidential(applicationType: { value: string; label: string }) {
    return applicationType.value === "true";
}

const ClientAppManagementPage = () => {
    const classes = vauthenticatorStyles();
    let {clientAppId} = useParams();
    const storePassword = !clientAppId
    const navigate = useNavigate();

    const [clientApplication, setClientApplication] = useState<ClientApplicationPageDetails>(newClientApplicationPageDetails(clientAppId, authorizedGrantTypesRegistry([])));

    const [clientApplicationId, setClientApplicationId] = useState<string | undefined>(clientAppId)
    const [clientAppName, setClientAppName] = useState("")
    const [secret, setSecret] = useState("*********")
    const [applicationType, setApplicationType] = useState<SelectOption>(CONFIDENTIAL_CLIENT_APP_TYPE)
    const [availableClientApplicationTypes] = useState<SelectOption[]>([CONFIDENTIAL_CLIENT_APP_TYPE, PUBLIC_CLIENT_APP_TYPE])
    const [scopes, setScopes] = useState<SelectOption[]>([])
    const [availableScopes, setAvailableScopes] = useState<SelectOption[]>([])
    const [authorizedGrantTypes, setAuthorizedGrantTypes] = useState(authorizedGrantTypesRegistry([]))
    const [webServerRedirectUri, setWebServerRedirectUri] = useState("")
    const [allowedOrigins, setAllowedOrigins] = useState("")
    const [withPkce, setWithPkce] = useState(false)
    const [accessTokenValidity, setAccessTokenValidity] = useState("")
    const [refreshTokenValidity, setRefreshTokenValidity] = useState("")
    const [postLogoutRedirectUri, setPostLogoutRedirectUri] = useState("")
    const [logoutUri, setLogoutUri] = useState("")
    const [openSecretAlert, setOpenSecretAlert] = useState(false)


    const generateRandomClientApplicationId = () => {
        setClientApplicationId(randomClientApplicationIdGenerator)
    }

    const generateRandomClientApplicationIdItem = <AddCircleIcon onClick={generateRandomClientApplicationId}/>


    const generateRandomClientApplicationSecret = async () => {
        let randomSecret = await newClientApplicationRandomSecret();
        setSecret(randomSecret.pwd)
        setOpenSecretAlert(true)
    }

    const generateRandomClientApplicationSecretItem = <Autorenew onClick={generateRandomClientApplicationSecret}/>

    const handleCloseSecretAlert = () => {
        setOpenSecretAlert(false)
    }
    let maskedContentWith = (content: string, mask: string = "*") => content.replace(/./g, mask);

    const saveClientApp = () => {
        let clientApplication: ClientApplicationDetails = {
            clientAppName: clientAppName,
            secret: isClientApplicationConfidential(applicationType) ? secret : "",
            withPkce: withPkce,
            confidential: isClientApplicationConfidential(applicationType),
            storePassword: storePassword,
            scopes: scopes.map(scope => scope.value),
            authorizedGrantTypes: authorizedGrantTypesParam(authorizedGrantTypes),
            webServerRedirectUri: webServerRedirectUri,
            accessTokenValidity: accessTokenValidity,
            refreshTokenValidity: refreshTokenValidity,
            postLogoutRedirectUri: postLogoutRedirectUri,
            allowedOrigins: allowedOrigins.split(","),
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
            setAvailableScopes(scopes.map(scope => {
                return {value: scope, label: scope}
            }))

            let clientApp = await findClientApplicationFor(clientApplicationId!!)

            setClientApplication(
                {
                    clientApplicationId: clientApp.clientAppName,
                    clientAppName: clientApp.clientAppName,
                    secret: clientApp.secret,
                    applicationType: CONFIDENTIAL_CLIENT_APP_TYPE,
                    scopes: clientApp.scopes.map(scope => {
                        return {value: scope, label: scope} as SelectOption;
                    }),
                    authorizedGrantTypes: authorizedGrantTypesRegistry(clientApp.authorizedGrantTypes as AuthorizedGrantType[]),
                    webServerRedirectUri: clientApp.webServerRedirectUri,
                    allowedOrigins: clientApp.allowedOrigins.join(","),
                    withPkce: clientApp.withPkce,
                    accessTokenValidity: clientApp.accessTokenValidity,
                    refreshTokenValidity: clientApp.refreshTokenValidity,
                    postLogoutRedirectUri: clientApp.postLogoutRedirectUri,
                    logoutUri: clientApp.logoutUri,
                }
            )
            setClientAppName(clientApp.clientAppName)
            setSecret(clientApp.secret)
            setScopes(clientApp.scopes.map(scope => {
                return {value: scope, label: scope};
            }))
            setApplicationType(clientApp.confidential ? CONFIDENTIAL_CLIENT_APP_TYPE : PUBLIC_CLIENT_APP_TYPE)
            setAuthorizedGrantTypes(authorizedGrantTypesRegistry(clientApp.authorizedGrantTypes as AuthorizedGrantType[]))
            setWithPkce(clientApp.withPkce)
            setWebServerRedirectUri(clientApp.webServerRedirectUri)
            setAccessTokenValidity(clientApp.accessTokenValidity)
            setRefreshTokenValidity(clientApp.refreshTokenValidity)
            setPostLogoutRedirectUri(clientApp.postLogoutRedirectUri)
            setLogoutUri(clientApp.logoutUri)
            setAllowedOrigins(clientApp.allowedOrigins.join(","))
        }

        init().then()
    }, [])
    const [value, setValue] = React.useState('0');
    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };

    let pageTitle = clientApplicationId ? `: Client Application: ${clientApplicationId}` : "";
    return <AdminTemplate maxWidth="xl" page={pageTitle}>
        <Snackbar open={openSecretAlert}>
            <Alert onClose={handleCloseSecretAlert} icon={false} severity="success" sx={{whiteSpace: 'pre-line'}}>
                <span>Secret: {maskedContentWith(secret)} <ContentCopy sx={{margin: "4px 8px -4px 0"}}
                                                                       onClick={async () => {
                                                                           if (('clipboard' in navigator)) {
                                                                               await navigator.clipboard.writeText(maskedContentWith(secret))
                                                                           } else {
                                                                               copy(secret)
                                                                           }
                                                                       }}/> </span>
            </Alert>
        </Snackbar>

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
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.clientApplicationId = value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            suffixItem={generateRandomClientApplicationIdItem}
                                            value={clientApplication.clientApplicationId || ""}/>

                        <FormSelect id="applicationType"
                                    label="Application Type"
                                    multi={false}
                                    onChangeHandler={(event) => {
                                        setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                            clientApplication.applicationType = event
                                            return clientApplication
                                        })
                                    }}
                                    options={availableClientApplicationTypes}
                                    value={clientApplication.applicationType}/>

                        {isClientApplicationConfidential(applicationType) &&
                            <FormInputTextField id="secret"
                                                label="Password"
                                                required={true}
                                                type="Password"
                                                disabled={clientAppId != undefined}
                                                handler={(value) => {
                                                    setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                        clientApplication.secret= value.target.value
                                                        return clientApplication
                                                    })
                                                }}
                                                suffixItem={clientAppId != undefined ?
                                                    <div/> : generateRandomClientApplicationSecretItem}
                                                value={clientApplication.secret}/>}


                        <FormInputTextField id="clientAppName"
                                            label="Client Application Displayed Name"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.clientAppName = value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            value={clientApplication.clientAppName}/>
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
                                        setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                            clientApplication.scopes = event
                                            return clientApplication
                                        })
                                    }}
                                    options={availableScopes}
                                    value={clientApplication.scopes}/>

                        <CheckboxesGroup id="withPkce"
                                         handler={(value) => {
                                             setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                 clientApplication.withPkce = value.target.checked
                                                 return clientApplication
                                             })
                                         }}
                                         choicesRegistry={{
                                             with_pkce: clientApplication.withPkce
                                         }}
                                         legend="Enable/Disable PKCE"/>

                        <CheckboxesGroup id="authorizedGrantTypes"
                                         handler={(value) => {
                                             setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                 clientApplication.authorizedGrantTypes = {
                                                     ...authorizedGrantTypes,
                                                     [value.target.name]: value.target.checked
                                                 }
                                                 return clientApplication
                                             })
                                         }}
                                         choicesRegistry={clientApplication.authorizedGrantTypes}
                                         legend="Authorized Grant Types"/>


                        <FormInputTextField id="accessTokenValidity"
                                            label="Access Token Validity"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.accessTokenValidity= value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            value={clientApplication.accessTokenValidity}/>

                        <FormInputTextField id="refreshTokenValidity"
                                            label="Refresh Token Validity"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.refreshTokenValidity= value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            value={clientApplication.refreshTokenValidity}/>

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

                        <FormInputTextField id="allowedOrigins"
                                            label="Allowed Origins"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.allowedOrigins= value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            value={clientApplication.allowedOrigins}/>

                        <FormInputTextField id="webServerRedirectUri"
                                            label="Web Server Redirect Uri"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.webServerRedirectUri= value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            value={clientApplication.webServerRedirectUri}/>

                        <FormInputTextField id="postLogoutRedirectUri"
                                            label="Post Logout Redirect Uri"
                                            required={true}
                                            handler={(value) => {
                                                setPostLogoutRedirectUri(value.target.value)
                                            }}
                                            value={clientApplication.postLogoutRedirectUri}/>

                        <FormInputTextField id="logoutUri"
                                            label="Logout Uri"
                                            required={true}
                                            handler={(value) => {
                                                setClientApplication((clientApplication: ClientApplicationPageDetails) => {
                                                    clientApplication.logoutUri= value.target.value
                                                    return clientApplication
                                                })
                                            }}
                                            value={clientApplication.logoutUri}/>
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
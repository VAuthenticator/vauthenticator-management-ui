import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomePage from "./home/HomePage";
import RolesManagementPage from "./roles/RolesManagementPage";
import AccountManagementPage from "./account/AccountManagementPage";
import AccountListPage from "./account/AccountListPage";
import ClientAppListPage from "./clientapp/ClientAppListPage";
import ClientAppManagementPage from "./clientapp/ClientAppManagementPage";

const VAuthenticatorAdminApp = () =>
    <HashRouter>
        <Routes>
            <Route exact={true} path="/" element={<HomePage/>}/>

            <Route exact={true} path="/client-applications/list"
                   element={<ClientAppListPage/>}/>

            <Route exact={true} path="/client-applications/save"
                   element={<ClientAppManagementPage/>} />

            <Route exact={true} path="/client-applications/edit/:clientAppId"
                   element={<ClientAppManagementPage/>}/>

            <Route exact={true} path="/roles" element={<RolesManagementPage/>}/>

            <Route exact={true} path="/accounts" element={<AccountListPage/>}/>
            <Route exact={true} path="/accounts/edit/:accountMail" element={<AccountManagementPage/>}/>
        </Routes>
    </HashRouter>


if (document.getElementById('app')) {
    ReactDOM.render(<VAuthenticatorAdminApp/>, document.getElementById('app'));
}
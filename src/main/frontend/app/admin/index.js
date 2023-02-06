import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomePage from "./home/HomePage";
import RolesManagementPage from "./roles/RolesManagementPage";

const VAuthenticatorAdminApp = () =>
        <HashRouter>
            <Routes>
                <Route exact={true} path="/" element={<HomePage />}/>
{/*
                <Route exact={true} path="/client-applications/list"
                       element={(props) => <ClientAppListPage {...props} />}/>

                <Route exact={true} path="/client-applications/save"
                       element={(props) => <ClientAppManagementPage {...props} />}/>

                <Route exact={true} path="/client-applications/edit/:clientAppId"
                       element={(props) => <ClientAppManagementPage {...props} />}/>
 */}
                <Route exact={true} path="/roles" element={<RolesManagementPage />}/>

                {/*
                <Route exact={true} path="/accounts" element={<AccountListPage  />}/>
                <Route exact={true} path="/accounts/edit/:accountMail"
                       element={(props) => <AccountManagementPage {...props} />}/>

                       */}
            </Routes>
        </HashRouter>


if (document.getElementById('app')) {
    ReactDOM.render(<VAuthenticatorAdminApp/>, document.getElementById('app'));
}
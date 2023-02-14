import React from 'react';
import MenuCard from "../../component/MenuCard";
import {Apps, AssignmentInd, PeopleAlt} from "@material-ui/icons";
import vauthenticatorStyles from "../../theme/styles";
import {useTheme} from "@mui/material";
import {Key} from "@mui/icons-material";

export default (props) => {
    let classes = vauthenticatorStyles(useTheme());
    const {content} = props;
    return (
        <MenuCard linkTo={content.link}
                  content={
                      <div>
                          <div style={classes.homeMenuItemTitle}>
                              <h1>{content.title.text}</h1>
                              {content.title.icon(classes)}
                          </div>
                          <h3 style={classes.homeMenuItemText}>
                              {content.body}
                          </h3>
                      </div>
                  }/>
    )
}

export const homeMenuContent = {
    clientApplications: {
        title: {
            text: "Client Application Management Section",
            icon: (classes) => <Apps style={classes.homeMenuItemIcon}/>
        },
        body: "In this section you can manage all client application on VAuthenticator. Your will able to " +
            "   create, delete, set parameters like redirect uri, application roles and so on",
        link: "/client-applications/list"
    },
    roles: {
        title: {
            text: "Roles Management Section",
            icon: (classes) => <AssignmentInd style={classes.homeMenuItemIcon}/>
        },
        body: "In this section you can manage all Role used in all applications federated with VAuthenticator. Your will able to " +
            "   create, delete or modify descriptions",
        link: "/roles"
    },
    accounts: {
        title: {
            text: "Account Management Section",
            icon: (classes) => <PeopleAlt style={classes.homeMenuItemIcon}/>
        },
        body: "In this section you can manage Accounts in VAuthenticator from OpenIdConnect prospective. Your will able to " +
            " disable accounts, invalidate and force password reset",
        link: "/accounts"
    },
    keys: {
        title: {
            text: "Key Management Section",
            icon: (classes) => <Key style={classes.homeMenuItemIcon}/>
        },
        body: "In this section you can manage Keys in VAuthenticator for token signature",
        link: "/keys"
    }
}
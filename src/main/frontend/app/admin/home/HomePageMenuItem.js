import React from 'react';
import MenuCard from "../../component/MenuCard";
import {Apps, AssignmentInd, PeopleAlt} from "@material-ui/icons";

export default (props) => {
    const {content} = props;
    return (
        <MenuCard linkTo={content.link}
                  content={
                      <div>
                          <div>
                              <h1>{content.title.text}</h1>
                              {content.title.icon()}
                          </div>
                          <h3>
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
            icon: () => <Apps/>
        },
        body: "In this section you can manage all client application on VAuthenticator. Your will able to " +
            "   create, delete, set parameters like redirect uri, application roles and so on",
        link: "/client-applications/list"
    },
    roles: {
        title: {
            text: "Roles Management Section",
            icon: () => <AssignmentInd/>
        },
        body: "In this section you can manage all Role used in all applications federated with VAuthenticator. Your will able to " +
            "   create, delete or modify descriptions",
        link: "/roles"
    },
    accounts: {
        title: {
            text: "Account Management Section",
            icon: () => <PeopleAlt/>
        },
        body: "In this section you can manage Accounts in VAuthenticator from OpenIdConnect prospective. Your will able to " +
            " disable accounts, invalidate and force password reset",
        link: "/accounts"
    }
}
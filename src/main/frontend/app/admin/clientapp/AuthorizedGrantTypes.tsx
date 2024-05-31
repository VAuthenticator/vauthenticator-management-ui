export enum AuthorizedGrantType {
    authorization_code = "authorization_code",
    refresh_token = "refresh_token",
    client_credentials = "client_credentials"
}


export const authorizedGrantTypesRegistry = (authorizedGrantTypes: AuthorizedGrantType[]) => {
    let registry  = {
        authorization_code: false,
        refresh_token: false,
        client_credentials: false
    }

    if (authorizedGrantTypes) {
        authorizedGrantTypes.map(authorizedGrantType => {
            registry[authorizedGrantType] = true;
        })
    }

    return registry;
}
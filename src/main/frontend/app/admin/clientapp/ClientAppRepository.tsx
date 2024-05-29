export type ClientApplicationInList = {
    clientAppId: string
    clientAppName: string
    scopes: string[]
    authorizedGrantTypes: string[]
}

export type ClientApplicationDetails = {
    clientAppName: string
    secret: string
    withPkce: boolean
    storePassword: boolean
    scopes: string[]
    authorizedGrantTypes: string[]
    webServerRedirectUri: string
    accessTokenValidity: string
    refreshTokenValidity: string
    postLogoutRedirectUri: string
    logoutUri: string
}

export async function findAllClientApplications(): Promise<Awaited<ClientApplicationInList[]>> {
    let response = await fetch("/secure/api/client-applications",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });
    let clientApplications = await response.json() as ClientApplicationInList[];
    return Promise.resolve(clientApplications)
}

export async function findClientApplicationFor(clientAppId: string): Promise<ClientApplicationDetails> {
    let response = await fetch(`/secure/api/client-applications/${clientAppId}`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });
    let clientApplication = await response.json() as ClientApplicationDetails;
    return Promise.resolve(clientApplication)
}

export function saveClientApplicationFor(clientAppId: string, clientApp: ClientApplicationDetails) {
    return fetch(`/secure/api/client-applications/${clientAppId}`,
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientApp),
            credentials: 'same-origin'
        })
}

export function resetSecretFor(clientAppId: string, secret: string) {
    return fetch(`/secure/api/client-applications/${clientAppId}`,
        {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"secret": secret}),
            credentials: 'same-origin'
        })
}

export function deleteClientApplicationFor(clientAppId: string) {
    return fetch(`/secure/api/client-applications/${clientAppId}`,
        {
            method: "DELETE",
            credentials: 'same-origin'
        })
}
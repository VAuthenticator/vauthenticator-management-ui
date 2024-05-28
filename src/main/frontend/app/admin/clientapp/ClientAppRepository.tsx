export async function findAllClientApplications() {
    let response = await fetch("/secure/api/client-applications",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });
    return response.json()
}

export async function findClientApplicationFor(clientAppId: string) {
    let response = await fetch(`/secure/api/client-applications/${clientAppId}`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });
    return response.json()
}

export function saveClientApplicationFor(clientAppId: string, clientApp: string) {
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
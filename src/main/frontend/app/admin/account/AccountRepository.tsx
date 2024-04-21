interface Account {
    email: string,
    enabled: boolean,
    accountLocked: boolean,
    authorities: string[],
    authorityRows: string[],
}

export async function findAccountFor(email: string) {
    let response = await fetch(`/secure/api/admin/accounts/${email}/email`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });
    return response.json()
}

export function saveAccountFor(account: Account) {
    return fetch(`/secure/api/admin/accounts/${account.email}/email`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account),
            credentials: 'same-origin'
        })
}

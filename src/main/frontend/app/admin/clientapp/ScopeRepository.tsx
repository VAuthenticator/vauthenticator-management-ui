export async function findAllScopes() {
    let response = await fetch("/scopes",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        });
    return response.json()
}

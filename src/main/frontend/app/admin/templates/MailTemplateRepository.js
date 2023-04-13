export function saveMailTemplateFor(mailTemplate) {
    return fetch("/secure/api/mail-template",
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailTemplate),
            credentials: 'same-origin'
        })
}

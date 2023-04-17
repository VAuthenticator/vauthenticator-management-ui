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
export function getMailTemplateFor(mailType) {
    return fetch(`/secure/api/mail-template/${mailType}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(r => r.json())
}

import React, {useRef, useState} from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import vauthenticatorStyles from "../../theme/styles";
import {Alert, Snackbar, useTheme} from "@mui/material";
import Typography from "@material-ui/core/Typography";

import Separator from "../../component/Separator";
import FormButton from "../../component/FormButton";
import FormSelect from "../../component/FormSelect";
import {getMailTemplateFor, saveMailTemplateFor} from "./MailTemplateRepository";


const MailTemplatePage = () => {
    const pageTitle = "Mail Template Management"
    const classes = vauthenticatorStyles(useTheme());

    let mailContent = useRef()
    const [mailType, setMailType] = useState("")
    const [openSucceeded, setOpenSucceeded] = React.useState(false);
    const [openFailure, setOpenFailure] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSucceeded(false);
        setOpenFailure(false);
    };

    let saveMailTemplate = () => {
        saveMailTemplateFor({
            mailType: mailType.value,
            body: mailContent.current.innerText
        })
            .then(r => {
                if(r.status === 204){
                    setOpenSucceeded(true);
                } else {
                    setOpenFailure(false);
                }
            })
    };
    return (
        <AdminTemplate maxWidth="xl" page={pageTitle}>
            <Snackbar open={openSucceeded} autoHideDuration={6000}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Mail Template save succeeded
                </Alert>
            </Snackbar>
            <Snackbar open={openFailure} autoHideDuration={6000}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Mail Template save failed
                </Alert>
            </Snackbar>
            <Typography variant="h2">
                Mail Template
            </Typography>

            <FormSelect label="Mail Template Type"
                        multi={false}
                        onChangeHandler={(event) => {
                            setMailType(event)
                            getMailTemplateFor(event.value)
                                .then(content => {
                                    mailContent.current.innerText = content.body
                                })
                        }}
                        options={[
                            {value: "WELCOME", label: "WELCOME"},
                            {value: "EMAIL_VERIFICATION", label: "EMAIL_VERIFICATION"},
                            {value: "RESET_PASSWORD", label: "RESET_PASSWORD"},
                            {value: "MFA", label: "MFA"}
                        ]}
            />

            <Separator/>

            <div ref={mailContent} contentEditable="true" style={classes.contentEditor}/>

            <Separator/>

            <FormButton label="Save" type="button" onClickHandler={saveMailTemplate}/>
        </AdminTemplate>
    )
}

export default MailTemplatePage
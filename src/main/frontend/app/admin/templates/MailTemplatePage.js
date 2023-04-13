import React, {useRef, useState} from 'react';
import AdminTemplate from "../../component/AdminTemplate";
import vauthenticatorStyles from "../../theme/styles";
import {useTheme} from "@mui/material";
import Typography from "@material-ui/core/Typography";

import Separator from "../../component/Separator";
import FormButton from "../../component/FormButton";
import FormSelect from "../../component/FormSelect";
import {saveMailTemplateFor} from "./MailTemplateRepository";


const MailTemplatePage = () => {
    const pageTitle = "Mail Template Management"
    const classes = vauthenticatorStyles(useTheme());

    let mailContent = useRef()
    const [mailType, setMailType] = useState("")
    let saveMailTempalte = () => {
        saveMailTemplateFor({
            mailType: mailType.value,
            body: mailContent.current.innerHTML
        })
            .then(_ => {
            })
    };
    return (
        <AdminTemplate maxWidth="xl" page={pageTitle}>

            <Typography variant="h2">
                Mail Template
            </Typography>

            <FormSelect label="Mail Template Type"
                        multi={false}
                        onChangeHandler={(event) => {
                            setMailType(event)
                        }}
                        options={[
                            {value: "WELCOME", label: "WELCOME"},
                            {value: "EMAIL_VERIFICATION", label: "EMAIL_VERIFICATION"},
                            {value: "RESET_PASSWORD", label: "RESET_PASSWORD"},
                            {value: "MFA", label: "MFA"}
                        ]}
            />

            <Separator/>

            <div ref={mailContent} contenteditable="true" style={classes.contentEditor}/>

            <Separator/>

            <FormButton label="Save" type="button" onClickHandler={saveMailTempalte}/>
        </AdminTemplate>
    )
}

export default MailTemplatePage
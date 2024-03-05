import React, {useState} from "react";

import FormInputTextField from "../../component/FormInputTextField";
import FormButton from "../../component/FormButton";
import Separator from "../../component/Separator";
import {resetSecretFor} from "./ClientAppRepository";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function ResetClientAppSecretDialog({onClose, open, clientAppId}) {
    const [secret, setSecret] = useState("")
    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg">
            <DialogTitle id="simple-dialog-title">Reset Client App <b>{clientAppId}</b> Secret-Key</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Put hear the new client app secret for client app: <b>{clientAppId}</b>
                </DialogContentText>

                <FormInputTextField id="resetSecretKeyField"
                                    label="Client App Secret"
                                    required={true}
                                    handler={(value) => {
                                        setSecret(value.target.value)
                                    }}/>

                <Separator/>

                <DialogActions>
                    <FormButton label="Save" onClickHandler={() => {
                        resetSecretFor(clientAppId, secret)
                            .then(value => onClose())
                    }}/>
                    <FormButton label="Close" onClickHandler={onClose}/>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
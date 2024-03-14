import React from "react";

import FormButton from "../component/FormButton";
import Separator from "../component/Separator";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function ConfirmationDialog({onExecute, onClose, open, title, message, maxWidth}) {
    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={maxWidth}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>

                <Separator/>

                <DialogActions>
                    <FormButton label="Yes" onClickHandler={onExecute}/>
                    <FormButton label="No" onClickHandler={onClose}/>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
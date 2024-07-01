import { useState } from 'react';
import Cookies from 'js-cookie';

import Button from './common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from'@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RefreshTokenDialog = () => {
    const [open, setOpen] = useState(false);

    const refreshToken = async () => {
        if (Cookies.get('refresh_token')) {
            const res = await fetch("http://localhost:5000/api/auth/refresh_token", {
                method: "GET"
            });

            const json = await res.json();
            if (res.ok) {
            }
            else {

            }
            setOpen(false);
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Token expired</DialogTitle>
            <DialogContent>
                <DialogContentText>Your access token has expired. Please refresh to continue.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Refresh" endIcon="none" handleClick={refreshToken}/>
            </DialogActions>
        </Dialog>
    );
}

export default RefreshTokenDialog;
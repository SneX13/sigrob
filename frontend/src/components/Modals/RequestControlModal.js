import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NotificationIcon from '@mui/icons-material/NotificationImportantOutlined';

export default function RequestControlModal(props) {
    const [loading, setLoading] = useState(false);

    const handleControlRequest = () => {
        console.log("SHow processing request msg")

        props.close();
    }

    return (
        <Dialog open={props.open} aria-labelledby="request-dialog-title" aria-describedby="request-dialog-description">
            <DialogTitle id="request-dialog-title" textAlign="center">
                <NotificationIcon color="warning"/> <br/>
                {"You are about to take over the control of the system"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="request-dialog-description">
                    Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam,
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{mb: 2, justifyContent: 'center'}}>
                <Button onClick={() => props.close()} variant="outlined">Cancel</Button>
                <Button onClick={handleControlRequest}
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        color="warning"
                >
                    Request
                </Button>
            </DialogActions>
        </Dialog>
    );
}

import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import CreateSystemIcon from '@mui/icons-material/CreateNewFolderOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAddNewSystemMutation} from "../../systems/systemsApiSlice";

export default function CreateNewSystemModal(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [addNewSystem] = useAddNewSystemMutation();

    useEffect(() => {
        setErrMsg('')
    }, [name])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await addNewSystem({name, company: 1}).unwrap()
            setName('')
            // todo: add notification successfully added the system

            navigate(`/systems/edit/${response.id}`)
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Name');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Create System Failed');
            }
        }
    }

    const handleNameInput = (e) => setName(e.target.value);

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle textAlign="center">
                    <CreateSystemIcon/> <br/>
                    Create New System
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide following information when creating a new system
                    </DialogContentText>
                    <Box component="form" sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="System Name"
                            type="text"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={handleNameInput}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{mb: 2}}>
                    <Button onClick={() => props.close()} variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit}
                            type="submit"
                            variant="contained"
                            disabled={loading || !name}
                    >
                        Create
                    </Button>
                </DialogActions>
                {errMsg && (
                    <Box>
                        <Alert severity="error">{errMsg}</Alert>
                    </Box>
                )}
            </Dialog>

        </div>
    )
}
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Avatar, Button, Card, CardHeader, CardMedia, CardActions, CardContent, CardActionArea, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Skeleton, Stack, Typography
} from "@mui/material";
import DeleteSystemIcon from '@mui/icons-material/PriorityHigh';
import {useDeleteSystemMutation} from "../../systems/systemsApiSlice";

export default function SystemCard(props) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteSystem] = useDeleteSystemMutation()
    const system = props.system

    const onDeleteSystem = async () => {
        try {
            await deleteSystem({id: props.systemId}).unwrap()
            //todo: show successfully deleted the system notification
            setDeleteModal(false)
        } catch (err) {
            console.error('Failed to delete the system', err)
        }
    }

    const handleOpenDeleteModal = () => {
        setDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
    };
    const navigate = useNavigate();

    return (
        <div>
            <Card sx={{maxWidth: 345}}>
                <CardActionArea onClick={() => navigate(`/systems/${props.systemId}/`)}>
                    <CardHeader
                        avatar={
                            <Avatar/>
                        }
                        title={system.name}
                        subheader={system.company ? system.company : 'Company Name missing'}
                    />
                    <CardMedia>
                        {/*  todo: remove skeleton when there is a system image to show */}
                        <Stack spacing={1}>
                            <Skeleton variant="rectangular" height={150} animation={false}/>
                        </Stack>
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {props.admin &&
                    <CardActions>
                        <Button size="small" onClick={() => navigate(`/systems/edit/${props.systemId}`)}>Edit</Button>
                        <Button size="small" onClick={handleOpenDeleteModal}>Delete</Button>
                    </CardActions>
                }
            </Card>
            <Dialog
                open={deleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" textAlign="center">
                    <DeleteSystemIcon color="error"/> <br/>
                    {"Delete " + system.name + "?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to permanently delete the {system.name}. This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{mb: 2}}>
                    <Button onClick={handleCloseDeleteModal} variant="outlined">Cancel</Button>
                    <Button onClick={onDeleteSystem} autoFocus variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

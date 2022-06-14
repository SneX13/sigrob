import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/icons-material/PrecisionManufacturingOutlined';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {
    CardActionArea,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Skeleton,
    Stack
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import DeleteSystemIcon from '@mui/icons-material/PriorityHigh';
import {useDeleteSystemMutation} from "../../systems/systemsApiSlice";
import {useSelector} from "react-redux";
import {selectSystemById} from "../../systems/systemsSlice";

export default function SystemCard(props) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteSystem] = useDeleteSystemMutation()
    const system = useSelector((state) => selectSystemById(state, Number(props.system.id)))

    /*todo: finish the function*/
    const onDeleteSystem = async () => {
        try {
            await deleteSystem({id: system.id}).unwrap()
            //remove system from list
            //show successfully deleted the system notification
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
                {/* todo: Pass props for all dynamic data: system name, subtitle, image, system id, etc */
                }
                <CardActionArea onClick={() => navigate(`/systems/${props.system.id}/`)}>
                    <CardHeader
                        avatar={
                            <Avatar/>
                        }
                        title={props.system.name}
                        subheader={props.system.company ? props.system.company : 'Company Name missing'}
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
                        <Button size="small" onClick={() => navigate(`/systems/edit/${props.system.id}`)}>Edit</Button>
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
                    {"Delete " + props.system.name + "?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to permanently delete the {props.system.name}. This action can not be undone.
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

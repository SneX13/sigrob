import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/icons-material/PrecisionManufacturingOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Button from "@mui/material/Button";
import {Skeleton, Stack} from "@mui/material";

export default function SystemCard(system) {
    const {id, name, subtitle, description, img} = system;

    /*todo write this function*/
    const updateSystem = (id) => {
      //
    };

    const deleteSystem = (id) => {
    //
    };

    return (
        <Card sx={{maxWidth: 345}}>
            {/* todo: Pass props for all dynamic data: system name, subtitle, image, system id, etc */
            }
            <CardHeader
                avatar={
                    <Avatar/>
                }
                title="System Name"
                subheader="Subtitle"
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
            <CardActions>
                <Button size="small" onClick={() => updateSystem(id)}>Edit</Button>
                <Button size="small" onClick={() => deleteSystem(id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}

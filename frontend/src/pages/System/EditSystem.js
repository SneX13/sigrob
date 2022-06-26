import React, {useEffect, useState} from 'react';

import {useParams, useNavigate} from 'react-router-dom';
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import UserMenu from "../../components/UserMenu/UserMenu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import MuiAppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import {useSelector} from "react-redux";
import {selectSystemById} from "../../systems/systemsApiSlice";

const EditSystem = () => {

    const {systemId} = useParams();
    const navigate = useNavigate();

    const drawerWidth = 240;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const mdTheme = createTheme();

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const system = useSelector((state) => selectSystemById(state, Number(systemId)))

    return (

        <ThemeProvider theme={mdTheme}>

            <Box sx={{display: 'flex'}}>
                <AppBar position="absolute" open={!open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            {system ? system.name : "System name"}
                        </Typography>
                        <UserMenu/>
                    </Toolbar>
                </AppBar>
                <Box component="main"
                     sx={{
                         flexGrow: 1,
                         paddingTop: '60px',
                         overflow: 'auto',
                     }}
                >
                    <Container maxWidth="lg">
                        {system ?
                            <Grid item xs={12} sx={{
                                paddingY: '20px',
                            }}>
                                {/*  if there is no system */}
                                <InfoIcon/>
                                <Typography variant="body1" gutterBottom>
                                    System not found.<br/>
                                </Typography>
                                <Link onClick={() => navigate(-1)}>
                                    Return to Dashboard
                                </Link>
                            </Grid>
                            :
                            <DragAndDrop/>
                        }

                    </Container>
                </Box>
            </Box>

        </ThemeProvider>

    )
}

export default EditSystem;
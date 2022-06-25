import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import {selectSystemById} from '../../systems/systemsApiSlice'
import {useParams, useNavigate} from 'react-router-dom';
import {Alert, AppBar, Collapse} from "@mui/material";
import Button from "@mui/material/Button";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UserMenu from "../../components/UserMenu/UserMenu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import MuiAppBar from "@mui/material/AppBar";
import {selectCurrentUser} from "../../auth/authSlice";
import SystemDataService from "../../services/api-helper"

const SingleSystem = () => {

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const mdTheme = createTheme();
    const navigate = useNavigate();
    const {systemId} = useParams();
    const user = useSelector(selectCurrentUser)
    const [system, setSystem] = useState([]);

    /* this should work with Redux but it is not working */
    //const system = useSelector((state) => selectSystemById(state, Number(systemId)))

    useEffect(() => {
        getSystems();
    }, [systemId]);

    const getSystems = () => {
        SystemDataService.getSystemWithComponents(Number(systemId))
            .then(response => {
                setSystem(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [open, setOpen] = useState(true);

    const [openAlert, setOpenAlert] = useState(true);
    let content;

    if (system.user_in_control !== user.id && system.user_in_control !== null) {
        content = <p>User has a VIEWER role.Show system with REQUEST control button. </p>
    } else if (system.user_in_control === user.id && system.control_state === 'single_controller') {
        content = <p>User has a CONTROLLER role.Show system with STOP control button. </p>
    } else if (system.control_state === "no_controller" && system.user_in_control === null) {
        content = <p>User has a VIEWER role. Show system with TAKE CONTROL button</p>;
    }


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
                            aria-label="back"
                            onClick={() => navigate(-1)}
                            sx={{
                                marginRight: '36px',
                            }}
                        >
                            <ChevronLeftIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            NAME UNDEFINED
                        </Typography>
                        <UserMenu/>
                    </Toolbar>
                </AppBar>
                <Box component="main"
                     sx={{
                         backgroundColor: (theme) =>
                             theme.palette.mode === 'light'
                                 ? theme.palette.grey[100]
                                 : theme.palette.grey[900],
                         flexGrow: 1,
                         paddingTop: '60px',
                         overflow: 'auto',
                     }}
                >
                    <Container maxWidth="lg">
                        {user.is_staff &&
                            <Collapse in={openAlert}>
                                <Alert severity="info" icon={false}
                                       action={
                                           <Button color="inherit" size="small"
                                                   onClick={() => navigate(`/systems/edit/${systemId}`)}>
                                               EDIT
                                           </Button>
                                       }
                                >
                                    You are viewing NAME UNDEFINED. You can edit the system by clicking the Edit button.
                                </Alert>
                            </Collapse>
                        }
                        {!system &&
                            <Grid item xs={12} sx={{
                                paddingTop: '20px',
                            }}>
                                {/*  if there is no system */}
                                <InfoIcon/>
                                <Typography variant="body1" gutterBottom>
                                    System not found.<br/>
                                </Typography>
                            </Grid>
                        }
                        {content}

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default SingleSystem;
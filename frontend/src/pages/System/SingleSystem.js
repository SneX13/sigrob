import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import {selectSystemById} from '../../systems/systemsApiSlice'
import {useParams, useNavigate} from 'react-router-dom';
import {Alert, AppBar, Collapse, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UserMenu from "../../components/UserMenu/UserMenu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import {selectCurrentUser} from "../../auth/authSlice";
import SystemDataService from "../../services/api-helper"
import HMISystem from "../../components/HMI/HMISystem";
import RequestControlModal from "../../components/Modals/RequestControlModal";

const SingleSystem = () => {

    const mdTheme = createTheme();
    const navigate = useNavigate();
    const {systemId} = useParams();
    const user = useSelector(selectCurrentUser)
    const [system, setSystem] = useState({});
    const [components, setComponents] = useState({});
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);
    const [openModal, setModalOpen] = useState(false);
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setLoading(false);
    };

    /* this should work with Redux but it is not working */
    //const system = useSelector((state) => selectSystemById(state, Number(systemId)))

    useEffect(() => {
        getSystems();
    }, [systemId]);

    const getSystems = () => {
        SystemDataService.getSystemWithComponents(Number(systemId))
            .then(response => {
                setSystem(response.data[0]);
                const componentsData = response.data.slice(1)
                setComponents(componentsData)
            })
            .catch(e => {
                console.log(e);
            });
    };

    let content;
    let buttonText;
    let appBarColour;
    let actionUrl;

    const requestControl = system.user_in_control !== user.id && system.user_in_control !== null;
    const userInControl = system.user_in_control === user.id && system.control_state === 'single_controller';
    const takeControl = system.control_state === "no_controller" && system.user_in_control === null;

    if (requestControl) {
        buttonText = "Request Control";
        appBarColour = "warning";
        actionUrl = "http://localhost:8000/api/systems/control/transfer";
        content = <p>User has a VIEWER role.Show system with REQUEST control button. </p>;
    } else if (userInControl) {
        buttonText = "Stop Controlling";
        appBarColour = "success";
        actionUrl = "http://localhost:8000/api/systems/control/release";
        content = <p>User has a CONTROLLER role.Show system with STOP control button. </p>
    } else if (takeControl) {
        buttonText = "Take Control"
        appBarColour = "primary"
        actionUrl = "http://localhost:8000/api/systems/control/request";
        content = <p>User has a VIEWER role. Show system with TAKE CONTROL button</p>;
    }
    const canEdit = user.is_staff && (system.control_state === "no_controller" && system.user_in_control === null);

    const handleSinglePointOfControl = () => {
        setLoading(true)
        const data = {
            user: user.id,
            id: systemId
        }
        if (requestControl) {
            return handleOpenModal();
        }
        SystemDataService.handleControlAction(actionUrl, data)
            .then(response => {
                getSystems();
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <AppBar position="absolute" color={appBarColour}>
                    <Toolbar
                        sx={{
                            justifyContent: "space-between",
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <Stack direction="row" alignItems="center">
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
                                {system.name}
                            </Typography>
                        </Stack>
                        <Button variant="outlined" disabled={loading} sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': {
                                borderColor: 'white',
                                color: 'white',
                            }
                        }} onClick={handleSinglePointOfControl}>
                            {buttonText}
                        </Button>
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
                        {canEdit &&
                            <Collapse in={openAlert}>
                                <Alert severity="info" icon={false}
                                       action={
                                           <Button color="inherit" size="small"
                                                   onClick={() => navigate(`/systems/edit/${systemId}`)}>
                                               EDIT
                                           </Button>
                                       }
                                >
                                    You are viewing {system.name}. You can edit the system by clicking the Edit button.
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
                        <HMISystem system={system} components={components}/>
                    </Container>
                </Box>
                <RequestControlModal open={openModal} close={() => handleCloseModal()}/>
            </Box>
        </ThemeProvider>
    )
}

export default SingleSystem;
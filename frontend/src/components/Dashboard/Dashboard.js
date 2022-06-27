import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUser, selectCurrentToken, setCredentials} from "../../auth/authSlice";
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import UserMenu from "../UserMenu/UserMenu";
import SystemsList from "../SystemsList/SystemsList";
import CreateNewSystemModal from "../Modals/CreateNewSystemModal";
import {useGetSystemsQuery,} from "../../systems/systemsApiSlice";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";

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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function Dashboard(props) {

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const user = useSelector(selectCurrentUser)

    const {
        data: systems,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSystemsQuery(user.id);

    const [openModal, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <AppBar position="absolute" open={user.is_staff ? open : !open}>
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
                            {props.name}
                        </Typography>
                        <UserMenu/>
                    </Toolbar>
                </AppBar>
                {user.is_staff &&
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Toolbar>
                        <Divider/>
                        <List component="nav">
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItemButton>
                            <ListItemButton onClick={handleOpenModal}>
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Create New System"/>
                            </ListItemButton>
                        </List>
                    </Drawer>
                }
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        paddingTop: '100px',
                        overflow: 'auto',
                    }}
                >


                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        {isSuccess &&
                            <Grid container spacing={3}>
                                {user.is_staff && !systems ?
                                    <Grid item xs={12}>
                                        {/*  if there is no system */}
                                        <InfoIcon/>
                                        <Typography variant="body1" gutterBottom>
                                            There is no system to show. <br/>
                                            To create one, click on the Create New System button below.
                                        </Typography>
                                        <Button
                                            onClick={handleOpenModal}
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                            startIcon={<AddIcon/>}
                                        >
                                            Create New System
                                        </Button>
                                    </Grid>
                                    :
                                    <SystemsList admin={user.is_staff} systems={systems}/>
                                }
                            </Grid>}
                    </Container>
                </Box>
                <CreateNewSystemModal open={openModal} close={() => handleCloseModal()}/>
            </Box>
        </ThemeProvider>
    );
}


import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectSystemById} from '../../systems/systemsApiSlice'
import {useParams, useNavigate} from 'react-router-dom';
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import UserMenu from "../../components/UserMenu/UserMenu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RobotIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {useUpdateSystemMutation} from "../../systems/systemsApiSlice";
import Link from "@mui/material/Link";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider, useDrop} from "react-dnd";
import Card from "../../components/SystemsList/SystemCard";
import LightModeIcon from '@mui/icons-material/LightMode';
import kuka from '../../../src/tempImg/kuka_robot.png'
import conveyer from '../../../src/tempImg/conveyor_line.jpeg'
import light from '../../../src/tempImg/light.png'
import {ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {DraggableComponent} from "../../components/DragAndDrop/DraggableComponent";
import {useCallback} from "react";
import update from "immutability-helper";
import {ItemTypes} from "../../components/DragAndDrop/ItemTypes";

const EditSystem = () => {

    const [componentsList, setComponentsList] = useState([
        {
            id: 1,
            name: 'Conveyor line',
            image: conveyer,
            x: null,
            y: null,
        },
        {
            id: 2,
            name: 'KUKA robot',
            image: kuka,
            x: null,
            y: null,
        },
        {
            id: 3,
            name: 'Light',
            image: light,
            x: null,
            y: null,
        },
    ])
    const {systemId} = useParams()
    const navigate = useNavigate()

    const [updateSystem, {isLoading}] = useUpdateSystemMutation()

    const system = useSelector((state) => selectSystemById(state, Number(systemId)))

    const [name, setName] = useState(system?.name)

    const [components, setComponents] = useState(system?.components)

    const onContentChanged = e => setComponents(e.target.value)

    const saveSystem = async () => {
        try {
            await updateSystem({id: systemId, name, components}).unwrap()
            navigate(`/systems/${systemId}`)
        } catch (err) {
            console.error('Failed to save the system', err)
        }

    }
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

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (

        <ThemeProvider theme={mdTheme}>

            <Box sx={{display: 'flex'}}>
                <AppBar position="absolute" open={!system ? open : !open}>
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
                            {system ? system.name : "System Name Undefined"}
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
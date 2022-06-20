import update from 'immutability-helper'
import React, {useCallback, useState} from 'react'
import {useDrop} from 'react-dnd'
import {DraggableComponent} from './DraggableComponent.js'
import {ItemTypes} from './simpleExample/ItemTypes.js'
import Box from "@mui/material/Box";
import {ListItem, ListItemAvatar, Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import conveyer from "../../tempImg/svgs/conveyer_belt.svg";
import kuka from "../../tempImg/svgs/kuka_robot.svg";
import light from "../../tempImg/svgs/yellow_light.svg";
import {useNavigate} from "react-router-dom";
import {CustomDragLayer} from "./CustomDragLayer";

export const Container = () => {
    /* const [listOfImages, setListOfImages] = useState();

     function importAll(r) {
         return r.keys().map(r);
     }

     useEffect(() => {
         const listOfImages = importAll(require.context('../../../src/tempImg/', false, /\.(png|jpe?g|svg)$/));
         setListOfImages(listOfImages)
     }, []);*/
    const [componentsList, setComponentsList] = useState({
        1: {
            id: 1,
            name: 'Conveyor line',
            image: conveyer,
            left: 0,
            top: 0,
        },
        2: {
            id: 2,
            name: 'KUKA robot',
            image: kuka,
            left: 0,
            top: 0,
        },
        3: {
            id: 3,
            name: 'Light',
            image: light,
            left: 0,
            top: 0,
        },
    })

    const moveComponent = useCallback(
        (id, left, top) => {
            setComponentsList(
                update(componentsList, {
                    [id]: {
                        $merge: {left, top},
                    },
                }),
            )
        },
        [componentsList],
    )
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.IMAGE,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset()
                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)
                moveComponent(item.id, left, top)
                return undefined
            },
        }),
        [moveComponent],
    )
    const navigate = useNavigate()

    return (
        <Grid container spacing={2} maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid item xs={12} md={2}>
                <List xs={6}>
                    {Object.keys(componentsList).map((key) => (
                        <ListItem
                            key={key}
                        >
                            <ListItemAvatar>
                                <DraggableComponent key={key} id={key} {...componentsList[key]} />

                            </ListItemAvatar>
                            <ListItemText primary={componentsList[key].name}/>
                        </ListItem>
                    ))
                    }
                    <Divider light/>
                    <ListItemButton onClick={() => navigate(-1)}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Return to Dashboard"/>
                    </ListItemButton>
                </List>
            </Grid>
            <Grid item xs={12} md={10}>
                <Box ref={drop} mb={4} sx={{
                    height: '50vw',
                    border: '1px solid black',
                    position: 'relative'
                }}>
                    {Object.keys(componentsList).map((key) => (
                        <DraggableComponent key={key} id={key} {...componentsList[key]} />
                    ))}
                </Box>
                <CustomDragLayer/>
            </Grid>
        </Grid>
    )
}

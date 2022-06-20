import update from 'immutability-helper'
import React, {useCallback, useState, useEffect} from 'react'
import {useDrop} from 'react-dnd'
import {DraggableComponent} from './DraggableComponent.js'
import {ItemTypes} from './simpleExample/ItemTypes.js'
import Box from "@mui/material/Box";
import {Drawer} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import conveyer from "../../tempImg/conveyor_line.jpeg";
import kuka from "../../tempImg/kuka_robot.png";
import light from "../../tempImg/light.png";
import {useNavigate} from "react-router-dom";

export const Container = () => {
    const [listOfImages, setListOfImages] = useState();

    function importAll(r) {
        return r.keys().map(r);
    }

    useEffect(() => {
        const listOfImages = importAll(require.context('../../../src/tempImg/', false, /\.(png|jpe?g|svg)$/));
        setListOfImages(listOfImages)
    }, []);
    const [componentsList, setComponentsList] = useState({
        a: {
            id: 1,
            name: 'Conveyor line',
            image: conveyer,
            left: 0,
            top: 0,
        },
        b: {
            id: 2,
            name: 'KUKA robot',
            image: kuka,
            left: 0,
            top: 0,
        },
        c: {
            id: 3,
            name: 'Light',
            image: light,
            left: 0,
            top: 0,
        },
    })
    const [boxes, setBoxes] = useState({
        a: {top: 20, left: 250, title: 'Drag me around'},
        b: {top: 180, left: 250, title: 'Drag me too'},
    })
    const moveBox = useCallback(
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
                moveBox(item.id, left, top)
                return undefined
            },
        }),
        [moveBox],
    )

    const navigate = useNavigate()

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <List>
                {Object.keys(componentsList).map((key) => (
                    <DraggableComponent key={key} id={key} {...componentsList[key]} />
                ))}
                <Divider light/>
                <ListItemButton onClick={() => navigate(-1)}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Return to Dashboard"/>
                </ListItemButton>
            </List>
            <Box ref={drop} mb={4} sx={{
                height: '50vw',
                border: '1px solid black',
                position: 'relative'
            }}>
            </Box>
        </div>

    )
}

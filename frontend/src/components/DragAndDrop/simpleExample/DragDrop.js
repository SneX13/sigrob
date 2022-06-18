import React, {useState} from 'react'
import {Picture} from './Picture'
import {useDrop} from 'react-dnd'
import conveyer from "../../../tempImg/conveyor_line.jpeg";
import kuka from "../../../tempImg/kuka_robot.png";
import light from "../../../tempImg/light.png";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {DraggableComponent} from "../DraggableComponent";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate} from "react-router-dom";
import {ListItem, ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const dragList = [
    {
        id: 1,
        name: 'Conveyor line',
        image: conveyer,
        left: 0,
        top: 0,
    },
    {
        id: 2,
        name: 'KUKA robot',
        image: kuka,
        left: 0,
        top: 0,
    },
    {
        id: 3,
        name: 'Light',
        image: light,
        left: 0,
        top: 0,
    }

]

const pictures = dragList.map(picture => <Picture key={picture.id} src={picture.image} id={picture.id}
                                                  name={picture.name}/>)

function Dragdrop() {

    const [board, setBoard] = useState([])
    const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImage(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))
    const navigate = useNavigate()
    const addImage = (id) => {
        const droppedPictures = dragList.filter(picture => id === picture.id)
        setBoard(board => [...board, droppedPictures[0]])
    }

    const boardImages = board.map(picture => <Picture src={picture.image} id={picture.id}/>)
    return (
        <div className='container'>
            <List>
                {dragList.map(picture =>
                    <Picture key={picture.id} src={picture.image} id={picture.id} name={picture.name}/>)}


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
                {boardImages}
            </Box>
        </div>
    )
}

export default Dragdrop
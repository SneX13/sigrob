import React from 'react';
import { useDrag } from 'react-dnd';
import {ListItem, ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

export function Picture(props) {
    const { id, name, left, top, src } = props

    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: { id, name,  left, top, src },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    return (
            <ListItem ref={drag} src={src} sx={
                {opacity: isDragging ? "0%" : "100%"}
            }>
                <ListItemAvatar>
                    <Avatar alt={name} src={src}/>
                </ListItemAvatar>
                <ListItemText primary={name}/>
            </ListItem>
    )
}
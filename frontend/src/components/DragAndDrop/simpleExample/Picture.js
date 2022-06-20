import React from 'react';
import {useDrag} from 'react-dnd';
import {ListItem, ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

export function Picture(props) {
    const {id, name, left, top, src} = props

    const [{isDragging, dropped}, drag] = useDrag(() => ({
        type: "image",
        item: {id, name, left, top, src},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            dropped: monitor.didDrop()
        }),
    }))

    function getStyles(left, top, isDragging, dropped) {
        console.log("IS DROPPED:", dropped)
        return {
            position: dropped ? 'absolute' : 'relative',

            top: top,
            left: left,
            // IE fallback: hide the real node using CSS when dragging
            // because IE will ignore our custom "empty image" drag preview.
            opacity: isDragging ? 0.5 : 1,
            height: isDragging ? 0 : '',
        }
    }

    return (
        <Avatar ref={drag} src={src} alt={name} src={src}
                sx={getStyles(left, top, isDragging, dropped)}/>

    )
}
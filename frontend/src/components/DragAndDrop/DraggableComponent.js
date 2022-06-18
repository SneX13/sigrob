import { memo, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { ItemTypes } from './ItemTypes.js'
import {Component} from "./Component";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        position: 'absolute',
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}
export const DraggableComponent = memo(function DraggableComponent(props) {
    const { id, name, left, top, image } = props

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.IMAGE,
            item: { id, left, top, name, image },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, name, image],
    )
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])
    return (
        <div
            ref={drag}
           // style={getStyles(left, top, isDragging)}
            role="DraggableBox"
        >
           <Component name={name} image={image} />
        </div>
    )
})

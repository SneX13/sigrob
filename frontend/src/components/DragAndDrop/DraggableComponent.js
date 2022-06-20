import React, {memo, useEffect} from 'react'
import {useDrag} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import {ItemTypes} from './simpleExample/ItemTypes.js'
import Avatar from "@mui/material/Avatar";


export const DraggableComponent = memo(function DraggableComponent(props) {
    const {id, name, left, top, image} = props
    const [{isDragging, dropped}, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.IMAGE,
            item: {id, name, left, top, image},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                dropped: monitor.didDrop()
            }),
        }),
        [id, name, left, top, image],
    )
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [])

    function getStyles(left, top, isDragging) {
        const transform = `translate3d(${left}px, ${top}px, 0)`
        return {
            position: dropped ? 'absolute' : 'relative',
            transform,
            WebkitTransform: transform,
            // IE fallback: hide the real node using CSS when dragging
            // because IE will ignore our custom "empty image" drag preview.
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            height: 'auto'
        }
    }

    return (
        <Avatar ref={drag} variant="square" alt={name} src={image}
                role={preview ? 'ComponentPreview' : 'Component'}
                sx={getStyles(isDragging, dropped)}/>
    )
})

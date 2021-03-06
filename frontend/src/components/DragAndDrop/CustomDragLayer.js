import React from 'react';
import {useDragLayer} from 'react-dnd';
import {ComponentDragPreview} from './ComponentDragPreview';
import {ItemTypes} from './ItemTypes.js';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }
    let {x, y} = currentOffset
    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
    }
}

export const CustomDragLayer = () => {
    const {itemType, isDragging, item, initialOffset, currentOffset} =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))

    function renderItem() {
        switch (itemType) {
            case ItemTypes.IMAGE:
                return <ComponentDragPreview image={item.image}/>
            default:
                return null
        }
    }

    if (!isDragging) {
        return null
    }
    return (
        <Grid item xs={12} md={10}>
            <Box mb={4} sx={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 100,
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
            }}>
                <div style={getItemStyles(initialOffset, currentOffset)}>
                    {renderItem()}
                </div>
            </Box>
        </Grid>
    )
}

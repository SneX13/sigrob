import React, {memo} from 'react';
import Avatar from "@mui/material/Avatar";


export const Component = memo(function Component({id, name, image, preview}) {
    function getStyles(left, top, isDragging) {
        return {
            cursor: 'move',
            /*top: top,
            left: left,
            // IE fallback: hide the real node using CSS when dragging
            // because IE will ignore our custom "empty image" drag preview.*/
            opacity: isDragging ? 0.5 : 1,

        }
    }
    return (

        <Avatar variant="square" id={id} alt={name} src={image} role={preview ? 'ComponentPreview' : 'Component'}
                sx={getStyles()}/>
    )
})

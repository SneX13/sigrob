import React, {memo} from 'react';
import Avatar from "@mui/material/Avatar";

export const Component = memo(function Component({name, image, preview}) {
    function getStyles() {
        return {
            cursor: 'move',
        }
    }

    return (
        <Avatar variant="square" alt={name} src={image} role={preview ? 'ComponentPreview' : 'Component'}
                sx={getStyles}/>

    )
})

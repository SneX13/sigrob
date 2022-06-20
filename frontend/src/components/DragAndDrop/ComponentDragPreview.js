import React, {memo} from 'react';
import Avatar from "@mui/material/Avatar";

const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
}
export const ComponentDragPreview = memo(function ComponentDragPreview({image}) {
    return (
        <Avatar variant="square" src={image}
                sx={styles} role={'ComponentPreview'}/>
    )
})

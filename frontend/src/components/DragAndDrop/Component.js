import { memo } from 'react'
import ListItemButton from "@mui/material/ListItemButton";
import {ListItem, ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
const styles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}
export const Component = memo(function Component({ name, image, yellow, preview }) {
    const backgroundColor = yellow ? 'yellow' : 'white'
    return (
        <div
            style={{backgroundColor }}
            role={preview ? 'ComponentPreview' : 'Component'}
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt={name} src={image}/>
                </ListItemAvatar>
                <ListItemText primary={name}/>
            </ListItem>
        </div>
    )
})

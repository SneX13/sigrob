import React from "react";
import {Avatar, Grid, ListItem, ListItemAvatar, ListItemText, List, Typography} from "@mui/material";

export default function HMISystem(props) {
    const {system, components} = props
    const componentsList = Array.prototype.slice.call(components)

    return (
        <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
                System {system.name} with connected components will appear here.
            </Typography>
            <List xs={6}>
                {componentsList.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemAvatar>
                            <img alt={item.name} src={require("../../tempImg/svgs/" + item.name + ".svg")}/>
                        </ListItemAvatar>
                    </ListItem>
                ))
                }
            </List>
        </Grid>
    );
}
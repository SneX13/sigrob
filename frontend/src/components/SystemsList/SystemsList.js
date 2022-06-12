import React from "react";
import Card from "./SystemCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {selectAvailableSystems} from "../../systems/systemsSlice";
import {useSelector} from "react-redux";

export default function SystemsList(props) {
    const systems = useSelector(selectAvailableSystems);

    return (
        <Grid item xs={12} display="flex" flexWrap="wrap" width={1008} gap={3}>
            {systems.slice(0).reverse().map((item) => (
                <Box key={item.id}>
                    <Card system={item} admin={props.admin}/>
                </Box>
            ))}
        </Grid>
    );
};


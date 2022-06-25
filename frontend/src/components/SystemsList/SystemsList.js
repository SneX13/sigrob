import React from "react";
import Card from "./SystemCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function SystemsList(props) {
    const {ids, entities} = props.systems

    return <Grid item xs={12} display="flex" flexWrap="wrap" width={1008} gap={3}>
        {ids.map((systemId) => (
            <Box key={systemId}>
                <Card systemId={systemId} admin={props.admin} system={entities[systemId]}/>
            </Box>
        ))}
    </Grid>;
};


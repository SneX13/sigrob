import React from "react";
import Card from "./SystemCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useGetSystemsQuery} from "../../systems/systemsApiSlice";

export default function SystemsList(props) {
    const {
        data: systems,
        isSuccess,
        error
    } = useGetSystemsQuery()
    return (
        isSuccess ?
            <Grid item xs={12} display="flex" flexWrap="wrap" width={1008} gap={3}>
                {systems.slice(0).reverse().map((item) => (
                    <Box key={item.id}>
                        <Card system={item} admin={props.admin}/>
                    </Box>
                ))}
            </Grid>
            :
            <p>{JSON.stringify(error)}</p>
    );
};


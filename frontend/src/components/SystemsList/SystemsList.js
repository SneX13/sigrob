import React, {useState, useEffect} from "react";
import DataService from "../../services/api";
import Card from "./SystemCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function SystemsList() {
    const [systems, setSystems] = useState([]);

    useEffect(() => {
        getSystems();
    }, []);

    const getSystems = () => {
        DataService.getAllSystems()
            .then(response => {
                setSystems(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <Grid item xs={12} display="flex" flexWrap="wrap" width={1008} gap={3}>
            {systems.slice(0).reverse().map((item) => (
                <Box key={item.id}>
                    <Card system={item}/>
                </Box>
            ))}
        </Grid>
    );
};


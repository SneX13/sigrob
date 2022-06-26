import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function HMISystem(props) {
    const {system, components} = props
    return (
        <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
                System with connected components will go here
            </Typography>
        </Grid>
    );
}
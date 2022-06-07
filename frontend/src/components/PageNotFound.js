import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DirectionsOffIcon from '@mui/icons-material/DirectionsOff';

export default function PageNotFound() {

    return (
        <Box component="main">
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <DirectionsOffIcon/>
                        <Typography variant="body1" gutterBottom>
                            Page Not Found
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
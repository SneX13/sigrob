import React from 'react';
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DirectionsOffIcon from "@mui/icons-material/DirectionsOff";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Box component="main">
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <DirectionsOffIcon/>
                        <Typography variant="body1" gutterBottom>
                            Unauthorized <br/>
                            You do not have access to this page.
                        </Typography>
                        <Button onClick={goBack}>Go Back</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Unauthorized;
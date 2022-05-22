import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
                SIGROB
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Container component="footer" maxWidth="xs">
            <Box sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Copyright/>
            </Box>
        </Container>
    )
        ;
}
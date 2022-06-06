import React, {useState, useRef} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {login} from "../../actions/auth";
import {Alert} from "@mui/material";

const theme = createTheme();

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    props.history.push("/admin-dashboard");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    return (isLoggedIn ? <Navigate to="/admin-dashboard"/> :
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Form component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} ref={form}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                autoFocus
                                value={email}
                                onChange={onChangeEmail}
                                error={message}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={onChangePassword}
                                error={message}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            {message && (
                                <Box ref={form}>
                                    <Alert severity="error">{message}</Alert>
                                </Box>
                            )}
                            <CheckButton
                                style={{display: "none"}}
                                ref={checkBtn}
                            />
                        </Form>
                    </Box>
                </Container>
            </ThemeProvider>
    )
}

export default Login;
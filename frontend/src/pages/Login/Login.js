import React, {useEffect, useRef, useState} from "react";
import useAuth from '../../hooks/useAuth';
import {useLocation, useNavigate} from 'react-router-dom';
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
import {Alert} from "@mui/material";
import jwt_decode from "jwt-decode";

const theme = createTheme();


const Login = () => {
    const {setAuth} = useAuth();
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(
        localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(
        localStorage.getItem('authTokens')) : null);
    let [loader, setLoader] = useState(true)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const navigateTo = useNavigate();

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    let loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch('http://127.0.0.1:8000/app/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })
        let data = await response.json()
        console.log('data:', data);
        console.log('response', response);
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigateTo('/admin');
        } else {
            alert("Some error")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigateTo('/');
    }

    let updateUserToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/app/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens?.refresh
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loader) {
            setLoader(false);
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {

        // if(loader){
        //     updateUserToken()
        // }

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authTokens) {
                updateUserToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loader])


    // setLoading(true);
    // try {
    //     const response = AuthService.login(email, password)
    //     console.log(JSON.stringify(response?.data));
    //     console.log(JSON.stringify(response));
    //     const accessToken = response?.data?.accessToken;
    //     const roles = response?.data?.roles;
    //     setAuth({email, password, roles, accessToken});
    //     setEmail('');
    //     setPassword('');
    //     navigate(from, {replace: true});
    // } catch (err) {
    //     console.log("ERR:", err)
    //     if (!err?.response) {
    //         setErrMsg('No Server Response');
    //     } else if (err.response?.status === 400) {
    //         setErrMsg('Missing Username or Password');
    //     } else if (err.response?.status === 401) {
    //         setErrMsg('Unauthorized');
    //     } else {
    //         setErrMsg('Login Failed');
    //     }
    //     errRef.current.focus();
    // }

    return (
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
                    <Box component="form" onSubmit={loginUser} sx={{mt: 1}}>
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
                            onChange={(e) => setEmail(e.target.value)}

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
                            onChange={(e) => setPassword(e.target.value)}
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
                            disabled={loading || !(email && password)}
                        >
                            Sign In
                        </Button>
                        {errMsg && (
                            <Box>
                                <Alert severity="error">{errMsg}</Alert>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
};


export default Login;
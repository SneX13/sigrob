import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {setCredentials} from "../../auth/authSlice";
import {useLoginMutation} from "../../auth/authApiSlice";
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

const theme = createTheme();

const Login = () => {
    const userRef = useRef();
    const navigate = useNavigate();
    const errRef = useRef();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, {isLoading}] = useLoginMutation();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const userData = await login({email, password}).unwrap();
            console.log("USER DATA:", userData)
            /*getting only the token ??? should dispatch user not email*/
            dispatch(setCredentials({...userData, email}));
            setUser('');
            setPassword('');
            navigate("/admin");
            setLoading(false)
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };
    const handleEmailInput = (e) => setEmail(e.target.value)

    const handlePasswordInput = (e) => setPassword(e.target.value)

    return (
        isLoading ? <h1>Loading...</h1> :
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
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
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
                                ref={userRef}
                                onChange={handleEmailInput}

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
                                onChange={handlePasswordInput}
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
}

export default Login;
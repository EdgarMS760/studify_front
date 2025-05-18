import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Google, GitHub, Facebook } from '@mui/icons-material';
import { loginUser } from '@services/authService';
import { useSnackbar } from '@libs/store/SnackbarContext';
import { useAuth } from '@libs/store/AuthProvider';

const FormLogin = ({ onToggle }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const { showSnackbar } = useSnackbar();
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true);
            const response = await loginUser({
                email: credentials.email,
                password: credentials.password,
            });
            showSnackbar(response.message, 'success');
            login(response.user, response.token);
            navigate('/')
            // onToggle();
        } catch (err) {
            console.error("Error al registrar:", err);
            const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
            showSnackbar(message, 'error');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box className="p-3"
            sx={[
                (theme) => ({
                    backgroundColor: "white",
                    height: '100vh',
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}
        >
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin='normal'
                    required
                    name="email"
                    fullWidth
                    label="E-mail"
                    onChange={handleChange}
                    sx={
                        [
                            (theme) => ({
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "#FFFFFF",
                                    "&:hover": {
                                        backgroundColor: "#e5e7eb",
                                    }
                                }
                            }),
                            (theme) =>
                                theme.applyStyles('dark', {
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "#262626",
                                        "&:hover": {
                                            backgroundColor: "#334155",
                                        }
                                    },
                                }),
                        ]

                    } />
                <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />
                <div className="flex justify-end mt-2">
                    <Button variant='text' sx={[
                        (theme) => ({
                            color: 'blue',
                            fontWeight: 'bold',
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                color: theme.vars.palette.text.primary,
                                fontWeight: 'bold',
                            }),
                    ]} >¿Olvidaste tu contraseña?</Button>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    fullWidth
                    sx={[
                        (theme) => ({
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '1rem',
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                color: 'black',
                            }),
                    ]}
                >
                    Iniciar Sesion
                </Button>
            </Box>

            <Typography variant="body2" sx={[
                (theme) => ({
                    color: "black",
                    marginTop: '1rem',
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        color: 'white',
                    }),
            ]}>
                O puedes iniciar con
            </Typography>
            <div className="flex justify-center mt-2">
                <IconButton><Google /></IconButton>
                <IconButton><GitHub /></IconButton>
                <IconButton><Facebook /></IconButton>
            </div>

            <Typography variant="body2"
                sx={[
                    (theme) => ({
                        color: 'black',
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            color: "white",
                        }),
                ]}>
                ¿No tienes cuenta todavía?{' '}
            </Typography>
            <Button onClick={onToggle} variant='text' sx={[
                (theme) => ({
                    color: 'blue',
                    fontWeight: 'bold',
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        color: theme.vars.palette.text.primary,
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                    }),
            ]} >Registrate aquí</Button>
        </Box>
    );
};

export default FormLogin;

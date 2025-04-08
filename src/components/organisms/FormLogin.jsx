import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Google, GitHub, Facebook } from '@mui/icons-material';
import { loginUser } from '@services/auth/authService';
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
        <div className="bg-white flex flex-col overflow-hidden min-h-full">
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />
                <Typography
                    variant="body2"
                    sx={{ textAlign: 'right', mt: 1, cursor: 'pointer', color: 'blue' }}
                >
                    ¿Olvidaste tu contraseña?
                </Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    fullWidth
                    sx={{ mt: 2, py: 1.5, fontFamily: 'Montserrat', color: 'black' }}
                >
                    Iniciar
                </Button>
            </form>

            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>
                O puedes iniciar con
            </Typography>
            <div className="flex justify-center mt-2">
                <IconButton><Google /></IconButton>
                <IconButton><GitHub /></IconButton>
                <IconButton><Facebook /></IconButton>
            </div>

            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>
                ¿No tienes cuenta todavía?{' '}
                <span
                    onClick={onToggle}
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Regístrate aquí
                </span>
            </Typography>
        </div>
    );
};

export default FormLogin;

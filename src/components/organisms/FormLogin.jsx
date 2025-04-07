import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@libs/hooks/UseAuth';
import { Google, GitHub, Facebook } from '@mui/icons-material';

const FormLogin = ({ onToggle }) => {
    const navigate = useNavigate();
    const { authentication } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await authentication.signIn(credentials.email, credentials.password);
        if (success) navigate('/');
    };


    return (
        <div className="bg-white flex flex-col overflow-hidden min-h-full">
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

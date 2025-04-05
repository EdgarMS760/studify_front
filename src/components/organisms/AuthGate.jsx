import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@libs/hooks/UseAuth';
import { Google, GitHub, Facebook } from '@mui/icons-material';

const AuthGate = () => {
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
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <Box 
                sx={{ 
                    width: 400, 
                    padding: 4, 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    backgroundColor: '#ffffff', 
                    textAlign: 'center' 
                }}
            >
                <img src="/Logo.png" alt="Studify Logo" style={{ width: 200, marginBottom: 10 }} />
                <Typography variant="h5" sx={{ mb: 3 }}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="E-mail" name="email" margin="normal" variant="outlined" onChange={handleChange} />
                    <TextField fullWidth label="Contraseña" name="password" type="password" margin="normal" variant="outlined" onChange={handleChange} />
                    <Typography variant="body2" sx={{ textAlign: 'right', mt: 1, cursor: 'pointer', color: 'blue' }}>
                        Olvidaste tu contraseña?
                    </Typography>
                    <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2, py: 1.5, fontFamily: 'Montserrat', color: 'black' }}>
                        Iniciar
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>
                    O puedes iniciar con
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <IconButton><Google /></IconButton>
                    <IconButton><GitHub /></IconButton>
                    <IconButton><Facebook /></IconButton>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>
                    No tienes cuenta todavía? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>Regístrate Aquí</span>
                </Typography>
            </Box>
        </Box>
    );
};

export default AuthGate;

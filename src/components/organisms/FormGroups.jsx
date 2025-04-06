import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@libs/hooks/UseAuth';
import { Google, GitHub, Facebook } from '@mui/icons-material';

const FormGroups = () => {
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
        <Box sx={{ width: 400, margin: 'auto', mt: 5, textAlign: 'center', padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, color:"black" }}>Login</Typography>
        <form onSubmit={handleSubmit}>
            <TextField fullWidth label="E-mail" name="email" margin="normal" variant="outlined" onChange={handleChange} InputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: 'black' } }} />
            <TextField fullWidth label="Contraseña" name="password" type="password" margin="normal" variant="outlined" onChange={handleChange} InputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: 'black' } }} />
            <Typography variant="body2" sx={{ textAlign: 'right', mt: 1, cursor: 'pointer', color: 'blue' }}>Olvidaste tu contraseña?</Typography>
            <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2, py: 1.5, backgroundColor:'#F25019'}}>Iniciar</Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, color: "black"}}>O puedes iniciar con</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <IconButton sx={{color: "black"}}><Google /></IconButton>
            <IconButton sx={{color: "black"}}><GitHub /></IconButton>
            <IconButton sx={{color: "black"}}><Facebook /></IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color:"black" }}>No tienes cuenta todavía? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>Regístrate Aquí</span></Typography>
    </Box>
    );
};

export default FormGroups;

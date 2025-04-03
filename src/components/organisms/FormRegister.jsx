import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, Avatar, IconButton, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@libs/hooks/UseAuth';

const FormRegister = () => {
    const navigate = useNavigate();
    const { authentication } = useAuth();
    const [user, setUser] = useState({ email: '', password: '', name: '', role: 'Alumno', avatar: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await authentication.signUp(user.email, user.password, user.name, user.role, user.avatar);
        if (success) navigate('/');
    };

    return (
        <Box sx={{ width: 700, margin: 'auto', mt: 5, textAlign: 'center', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
            <img src="/Logo.png" alt="Studify Logo" style={{textAlign: 'center' ,width: 250, marginBottom: 10 }} />
            <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Montserrat', color: 'black'}}>Registro</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField fullWidth label="Nombre Completo" name="name" margin="normal" variant="outlined" onChange={handleChange} />
                    <TextField fullWidth label="E-mail" name="email" margin="normal" variant="outlined" onChange={handleChange} />
                    <TextField fullWidth label="Contraseña" name="password" type="password" margin="normal" variant="outlined" onChange={handleChange} />
                    <TextField fullWidth label="Confirmar Contraseña" name="confirmPassword" type="password" margin="normal" variant="outlined" onChange={handleChange} />
                    <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>Seleccione su rol</Typography>
                    <RadioGroup row name="role" value={user.role} onChange={handleChange} sx={{ justifyContent: 'center', fontFamily: 'Montserrat', color: 'black' }}>
                        <FormControlLabel value="Alumno" control={<Radio />} label="Alumno" />
                        <FormControlLabel value="Maestro" control={<Radio />} label="Maestro" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6} textAlign="center">
                    <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>Imagen de Perfil</Typography>
                    <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={user.avatar} />
                    <Button variant="contained" component="label" sx={{ mt: 1, fontFamily: 'Montserrat', color: 'black', backgroundColor: '#f25019' }}>
                        Upload Image
                        <input type="file" hidden onChange={(e) => setUser({ ...user, avatar: URL.createObjectURL(e.target.files[0]) })} />
                    </Button>
                    <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>Seleccione su Avatar</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        {["/avatar1.png", "/avatar2.png", "/avatar3.png"].map((src) => (
                            <IconButton key={src} onClick={() => setUser({ ...user, avatar: src })}>
                                <Avatar src={src} sx={{ width: 50, height: 50 }} />
                            </IconButton>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2, py: 1.5, fontFamily: 'Montserrat', color: 'black' }}>Registrarse</Button>
            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black'}}>¿Ya tienes una cuenta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>Inicia Sesión</span></Typography>
        </Box>
    );
};


export default FormRegister
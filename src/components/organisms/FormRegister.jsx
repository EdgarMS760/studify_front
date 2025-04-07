import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, Avatar, IconButton, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@libs/hooks/UseAuth';

const FormRegister = ({onToggle }) => {
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
        <Box sx={{ width: 600, margin: 'auto', mt: 5, textAlign: 'center', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
            
            <Grid container spacing={3}>
                <Grid item xs={6} InputProps={{ style: { color: 'black' } }}>
                    <TextField fullWidth label="Nombre Completo" name="name" margin="normal" variant="outlined" onChange={handleChange} InputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: 'black' } }} />
                    <TextField fullWidth label="E-mail" name="email" margin="normal" variant="outlined" onChange={handleChange} InputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: 'black' } }} />
                    <TextField fullWidth label="Contraseña" name="password" type="password" margin="normal" variant="outlined" onChange={handleChange} InputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: 'black' } }} />
                    <TextField fullWidth label="Confirmar Contraseña" name="confirmPassword" type="password" margin="normal" variant="outlined" onChange={handleChange} InputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: 'black' } }} />
                    
                    <Typography variant="body2" sx={{ mt: 2, color: 'black' }}>Seleccione su rol</Typography>
                    <RadioGroup row name="role" value={user.role} onChange={handleChange} sx={{ justifyContent: 'center', fontFamily: 'Montserrat', color: 'black' }}>
                        <FormControlLabel value="Alumno" control={<Radio />} label="Alumno" />
                        <FormControlLabel value="Maestro" control={<Radio />} label="Maestro" />    
                    </RadioGroup>
                </Grid>

                
                <Grid item xs={6} textAlign="center">
                    <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={user.avatar} />
                    <Button variant="contained" component="label" sx={{ mt: 1, fontFamily: 'Montserrat', color: 'black', backgroundColor: '#f25019' }}>Upload Image
                        <input type="file" hidden onChange={(e) => setUser({ ...user, avatar: URL.createObjectURL(e.target.files[0]) })} />
                    </Button>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        {["/avatar1.png", "/avatar2.png", "/avatar3.png"].map((src) => (
                            <IconButton key={src} onClick={() => setUser({ ...user, avatar: src })}>
                                <Avatar src={src} sx={{ width: 50, height: 50 }} />
                            </IconButton>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2, py: 1.5, fontFamily: 'Montserrat', color: 'black', backgroundColor: '#f25019'}}>Registrarse</Button>
            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black'}}>¿Ya tienes una cuenta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onToggle}>Inicia Sesión</span></Typography>
        </Box>
    );
};


export default FormRegister
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, Avatar, IconButton, Grid, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { registerUser } from '@services/auth/authService';
import { useSnackbar } from '@libs/store/SnackbarContext';
import { fileToBase64 } from '@libs/helpers/fileToBase64';

const FormRegister = ({ onToggle }) => {

    const [user, setUser] = useState({ email: '', password: '', name: '', role: 'Alumno', avatar: '' });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64 = await fileToBase64(file);
            setUser(prev => ({ ...prev, avatar: base64 }));
        } catch (err) {
            console.error("Error al convertir imagen:", err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!user.name) newErrors.name = "Nombre requerido";
        if (!user.email) newErrors.email = "Email requerido";
        else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Email inválido";
        if (!user.password || user.password.length < 6)
            newErrors.password = "Mínimo 6 caracteres";
        if (user.confirmPassword !== user.password)
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        if (!user.role) newErrors.role = "Seleccione un rol";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        console.log('user', user)
        try {
            setLoading(true);
            const response = await registerUser({
                nombre: user.name,
                email: user.email,
                password: user.password,
                rol: user.role.toLowerCase(),
                foto_perfil: user.avatar || null
            });
            showSnackbar(response.message, 'success');
            onToggle();
        } catch (err) {
            console.error("Error al registrar:", err);
            const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
            showSnackbar(message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: 600,
                margin: 'auto',
                textAlign: 'center',
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#ffffff',
            }}
        >
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Nombre Completo"
                        name="name"
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        fullWidth
                        label="Confirmar Contraseña"
                        name="confirmPassword"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />

                    <Typography variant="body2" sx={{ mt: 2 }}>Seleccione su rol</Typography>
                    <RadioGroup
                        row
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        sx={{ justifyContent: 'center', fontFamily: 'Montserrat', color: 'black' }}
                    >
                        <FormControlLabel value="Alumno" control={<Radio />} label="Alumno" />
                        <FormControlLabel value="Maestro" control={<Radio />} label="Maestro" />
                    </RadioGroup>
                    {errors.role && (
                        <Typography variant="caption" color="error">{errors.role}</Typography>
                    )}
                </Grid>

                <Grid item xs={6} textAlign="center">
                    <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={user.avatar} />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 1, fontFamily: 'Montserrat', color: 'black', backgroundColor: '#f25019' }}
                    >
                        Subir Imagen
                        <input type="file" hidden onChange={handleFileChange} />
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

            <Button
                type="submit"
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 2, py: 1.5, fontFamily: 'Montserrat', color: 'black', backgroundColor: '#f25019' }}
            >
                Registrarse
            </Button>
            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Montserrat', color: 'black' }}>
                ¿Ya tienes una cuenta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onToggle}>Inicia Sesión</span>
            </Typography>
        </Box>
    );

};


export default FormRegister
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, Avatar, IconButton, Grid, Snackbar, Alert, Backdrop, CircularProgress, styled } from '@mui/material';
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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box
            component="form"


        >
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={3}>
                <Grid item
                    xs={12}
                    md={6}
                    order={{ xs: 1, md: 2 }}
                    textAlign="center">
                    <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={user.avatar} />

                    <Button
                        component="label"
                        variant="contained"
                        sx={[
                            (theme) => ({
                                color: 'white',
                                fontWeight: 'bold',
                                marginTop: '1rem',
                                maxWidth: '33%',
                            }),
                            (theme) =>
                                theme.applyStyles('dark', {
                                    color: 'black',
                                }),
                        ]}

                    >
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                        Subir Imagen
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        {["/avatar1.png", "/avatar2.png", "/avatar3.png"].map((src) => (
                            <IconButton key={src} onClick={() => setUser({ ...user, avatar: src })}>
                                <Avatar src={src} sx={{ width: 50, height: 50 }} />
                            </IconButton>
                        ))}
                    </Box>
                </Grid>
                <Grid  item
        xs={12}
        md={6}
        order={{ xs: 2, md: 1 }}>
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

                        sx={[
                            (theme) => ({
                                color: 'black',
                                justifyContent: 'center',
                            }),
                            (theme) =>
                                theme.applyStyles('dark', {
                                    color: "white",
                                }),
                        ]}
                    >
                        <FormControlLabel value="Alumno" control={<Radio />} label="Alumno" />
                        <FormControlLabel value="Maestro" control={<Radio />} label="Maestro" />
                    </RadioGroup>
                    {errors.role && (
                        <Typography variant="caption" color="error">{errors.role}</Typography>
                    )}
                </Grid>


            </Grid>


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
                Registrarse
            </Button>

            <Typography variant="body2"
                sx={[
                    (theme) => ({
                        color: 'black',
                        marginTop: '1rem',
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            color: "white",
                        }),
                ]}>
                ¿Ya tienes una cuenta?{' '}
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
            ]} >Inicia sesión aquí</Button>
        </Box>
    );

};


export default FormRegister
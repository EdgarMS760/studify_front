import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Avatar, Box, Typography, Backdrop, CircularProgress } from "@mui/material";
import ButtonAtom from "@components/atoms/ButtonAtom";
import { useSessionAuth } from "@libs/hooks/useSessionAuth";
import { deleteImage, deleteImageByUrl, uploadImageAndGetUrl } from "@libs/helpers/firebaseUtils";
import { editUser } from "@services/userService";

import { useSnackbar } from '@libs/store/SnackbarContext';

const SettingsPage = () => {
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { session, updateSessionFromUser } = useSessionAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: "",
    });

    useEffect(() => {
        if (session) {
            setFormData({
                name: session?.user?.name || 'Usuario',
                avatar: session?.user?.image || '',
                email: session?.user?.email || '',
            })
        }
    }, [session]);

    const [imagePreview, setImagePreview] = useState(formData.avatar); // Para previsualizar la imagen antes de subirla

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                avatar: file, // Para la previsualización de la imagen
            });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let fileRef;
        const oldImageURL = session?.user?.image; // Guarda foto anterior
    
        try {
            setLoading(true);
    
            let avatarURL = formData.avatar || null;
    
            // Subir imagen si es nueva
            if (formData.avatar && typeof formData.avatar !== "string") {
                const { url, fileRef: uploadedRef } = await uploadImageAndGetUrl(
                    formData.avatar,
                    "avatars"
                );
                avatarURL = url;
                fileRef = uploadedRef;
            }
    
            // Actualizar usuario
            const response = await editUser({
                nombre: formData.name,
                email: formData.email,
                foto_perfil: avatarURL,
            });
    
            showSnackbar(response.message, "success");
    
            // 🔁 Actualizar sesión con el nuevo usuario
            updateSessionFromUser(response.usuario);
    
            // Borrar la imagen anterior si fue reemplazada y era de Firebase
            if (
                oldImageURL &&
                oldImageURL !== avatarURL &&
                oldImageURL.includes("firebasestorage.googleapis.com")
            ) {
                await deleteImageByUrl(oldImageURL);
            }
    
        } catch (err) {
            console.error("Error al registrar:", err);
            const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
            showSnackbar(message, "error");
    
            // se elimina la imagen si hubo un error en el post
            if (fileRef) {
                await deleteImage(fileRef);
            }
    
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <Box sx={{ padding: 2 }}>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h4" gutterBottom>
                Editar Perfil
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Foto de perfil */}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={imagePreview || formData.avatar}
                            />
                            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                                Cambiar Foto
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                        </Box>
                    </Grid>

                    {/* Nombre */}
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    {/* Correo electrónico */}
                    <Grid item xs={12}>
                        <TextField
                            label="Correo electrónico"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <div className="flex justify-center w-full mt-3">

                        <ButtonAtom onClick={handleSubmit} >
                            Guardar Cambios
                        </ButtonAtom>
                    </div>
                </Grid>
            </form>
        </Box>
    );
};

export default SettingsPage;

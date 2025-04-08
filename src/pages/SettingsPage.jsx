import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../libs/store/AuthProvider";
import ButtonAtom from "../components/atoms/ButtonAtom";


const SettingsPage = () => {
    const { user, token } = useAuth(); // Recuperamos los datos del usuario desde el contexto
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.nombre || "",
                email: user?.email || "",
                avatar: user?.foto_perfil || "",
            })
        }
    }, []);
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
                avatar: URL.createObjectURL(file), // Para la previsualización de la imagen
            });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);

    };

    return (
        <Box sx={{ padding: 2 }}>
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

                        <ButtonAtom>
                            Guardar Cambios
                        </ButtonAtom>
                    </div>
                </Grid>
            </form>
        </Box>
    );
};

export default SettingsPage;

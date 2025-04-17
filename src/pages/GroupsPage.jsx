import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, IconButton, styled, TextField, Typography } from '@mui/material';
import clsx from 'clsx'
import React, { useState } from 'react'
import CardGroup from '@components/molecules/CardGroup';
import TextCardAtom from '@components/atoms/TextCardAtom';
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from '@mui/icons-material/Upload';
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
const GroupsPage = () => {
    const [grupos, setGrupos] = useState([
        { id: 1, nombre: 'Español', imagen: 'https://placehold.co/40' },
        { id: 2, nombre: 'Mates', imagen: 'https://placehold.co/40' },
        { id: 3, nombre: 'Inglés', imagen: 'https://placehold.co/40' },
        { id: 4, nombre: 'Historia', imagen: 'https://placehold.co/40' },
        { id: 5, nombre: 'Ciencias', imagen: 'https://placehold.co/40' },
        { id: 6, nombre: 'Física', imagen: 'https://placehold.co/40' },
        { id: 7, nombre: 'Química', imagen: 'https://placehold.co/40' },
        { id: 8, nombre: 'Biología', imagen: 'https://placehold.co/40' },
        { id: 9, nombre: 'Geografía', imagen: 'https://placehold.co/40' },
        { id: 10, nombre: 'Arte', imagen: 'https://placehold.co/40' }
    ]);
    const handleGrupoClick = (grupo) => {
        alert(`Grupo seleccionado: ${grupo.nombre}`);
    };
    const [openModal, setOpenModal] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: "",
        image: "",
    });

    const handleAddGroup = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setNewGroup({ name: "", image: "" }); // Limpiar campos
    };

    const handleSaveGroup = () => {
        alert(`Nuevo grupo: ${newGroup.name} (${newGroup.image})`);
        // Aquí puedes agregar lógica para enviarlo a backend o agregar al estado
        handleCloseModal();
    };

    const [previewImage, setPreviewImage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setPreviewImage(imageUrl);
          setNewGroup((prev) => ({ ...prev, image: imageUrl }));
        }
      };
    return (
        <>
            <Box className={clsx('p-4 min-h-full'
            )}
                sx={[
                    (theme) => ({
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            backgroundColor: theme.vars.palette.secondary.main,
                        }),
                ]}>

                <TextCardAtom text="Tus Grupos" isHighlighted={true} className="text-4xl mb-4" />
                <Grid2 container spacing={2}>
                    {grupos.map((grupo) => (
                        <Grid2 item key={grupo.id}>
                            <CardGroup
                                grupo={grupo}
                                onEdit={() => { }}
                                onArchive={() => { }}
                            />
                        </Grid2>
                    ))}

                    {/* Botón para crear un nuevo grupo */}
                    <Grid2 item>
                        <div className="flex flex-col items-center justify-center h-full w-full">

                            <button
                                onClick={handleAddGroup}
                                className="shadow-sm rounded-md p-2"
                                style={{
                                    backgroundColor: '#FD841F',

                                }}
                            >
                                <AddIcon className="w-6 h-6" sx={[
                                    (theme) => ({
                                        color: "white",
                                    }),
                                    (theme) =>
                                        theme.applyStyles('dark', {
                                            color: "black",
                                        }),
                                ]} />
                            </button>
                        </div>
                    </Grid2>
                </Grid2>
            </Box>
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
                <DialogTitle>Crear nuevo grupo</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    {previewImage && (
                        <Box
                            component="img"
                            src={previewImage}
                            alt="Preview"
                            sx={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 2 }}
                        />
                    )}

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<UploadIcon />}
                    >
                        Subir imagen
                        <VisuallyHiddenInput type="file" onChange={handleImageChange} accept="image/*" />
                    </Button>

                    <TextField
                        label="Nombre del grupo"
                        value={newGroup.name}
                        onChange={(e) =>
                            setNewGroup((prev) => ({ ...prev, name: e.target.value }))
                        }
                        fullWidth
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button onClick={handleSaveGroup} variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default GroupsPage
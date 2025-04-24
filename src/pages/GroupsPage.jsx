import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, IconButton, Skeleton, styled, TextField, Typography } from '@mui/material';
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import CardGroup from '@components/molecules/CardGroup';
import TextCardAtom from '@components/atoms/TextCardAtom';
import AddIcon from "@mui/icons-material/Add";
import ModalManageGroups from '@components/molecules/ModalManageGroups';
import { useSnackbar } from '@libs/store/SnackbarContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deleteImage, uploadImageAndGetUrl } from '../libs/helpers/firebaseUtils';
import { getGroups, postGroup } from '../services/groups/groupService';

const GroupsPage = () => {
    const [grupos, setGrupos] = useState([
    ]);
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [openModal, setOpenModal] = useState(false);
    const [groupToEdit, setGroupToEdit] = useState(null);

    const [expandedArchived, setExpandedArchived] = React.useState(false);

    const handleChangeAccordionArchived = (panel) => (event, isExpanded) => {
        setExpandedArchived(isExpanded ? panel : false);
    };

    const handleAddGroup = () => {
        setGroupToEdit(null); // modo crear
        setOpenModal(true);
    };
    const handleEditGroup = (grupo) => {
        setGroupToEdit({
            ...grupo,
            image: grupo.image || null,
        });
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setGroupToEdit(null);
    };

    const handleSaveGroup = async (groupData) => {
        if (groupToEdit) {
            alert("Grupo editado:", groupData);
            console.log("Actualizar grupo:", groupData);
        } else {

            let fileRef;

            try {
                setLoading(true);

                // let picURL = groupData.image || null;

                // // Subir imagen si es nueva
                // if (groupData.image && typeof groupData.image !== "string") {
                //     const { url, fileRef: uploadedRef } = await uploadImageAndGetUrl(
                //         groupData.image,
                //         "avatars"
                //     );
                //     picURL = url;
                //     fileRef = uploadedRef;
                // }

                // Actualizar usuario
                const response = await postGroup({
                    nombre: groupData.nombre,
                    descripcion: groupData.descripcion,
                    //foto_perfil: picURL,
                });

                showSnackbar(response.message, "success");


            } catch (err) {
                console.error("Error al registrar:", err);
                const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
                showSnackbar(message, "error");

                // se elimina la imagen si hubo un error en el post
                // if (fileRef) {
                //     await deleteImage(fileRef);
                // }

            } finally {
                setLoading(false);
            }
            console.log("Crear grupo:", groupData);
            fetchGroups(); // Refrescar la lista de grupos después de crear uno nuevo
        }

        handleCloseModal();
    };

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const { groups, total, page } = await getGroups();
            setGrupos(groups);
        } catch (error) {
            console.error("Error al obtener grupos:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchGroups();
    }, []);
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

                {loading ? (
                    <Box className="flex items-center justify-center h-full w-full">

                        <CircularProgress color="primary" />
                    </Box>
                ) :
                    (
                        <>
                            <TextCardAtom text="Tus Grupos" isHighlighted={true} className="text-4xl mb-4" />
                            <Grid2 container spacing={2} sx={{ padding: 2 }}>
                                {(() => {
                                    const activos = grupos.filter((grupo) => grupo.estado === "no archivado");

                                    if (activos.length === 0) {
                                        return (
                                            <Typography variant="body1" sx={{ padding: 2 }}>
                                                No hay grupos activos.
                                            </Typography>
                                        );
                                    }

                                    return (
                                        <>
                                            {activos.map((grupo) => (
                                                <Grid2 key={grupo._id}>
                                                    <CardGroup
                                                        grupo={grupo}
                                                        onEdit={() => handleEditGroup(grupo)}
                                                        onArchive={() => console.log("Archivar grupo", grupo)}
                                                    />
                                                </Grid2>
                                            ))}

                                            {/* Botón para crear nuevo grupo*/}
                                            <div className="flex flex-col items-center justify-center">
                                                <Grid2>
                                                    <Box
                                                        onClick={handleAddGroup}
                                                        sx={{
                                                            height: '100%',
                                                            minHeight: 50,
                                                            minWidth: 50,
                                                            borderRadius: 2,
                                                            bgcolor: '#FD841F',
                                                            color: 'white',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                            boxShadow: 2,
                                                            transition: 'all 0.3s',
                                                            '&:hover': {
                                                                boxShadow: 4,
                                                                opacity: 0.9,
                                                            }
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
                                                    </Box>
                                                </Grid2>
                                            </div>
                                        </>
                                    );
                                })()}
                            </Grid2>

                        </>
                    )}
                <Box className="" sx={{ mt: 4 }}>
                    <Accordion expanded={expandedArchived === 'panel1'} onChange={handleChangeAccordionArchived('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                                Grupos Archivados
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid2 container spacing={2} sx={{ padding: 2 }}>
                                {(() => {
                                    const archivados = grupos.filter((grupo) => grupo.estado === "archivado");

                                    if (archivados.length === 0) {
                                        return (
                                            <Typography variant="body1" sx={{ padding: 2 }}>
                                                No hay grupos archivados.
                                            </Typography>
                                        );
                                    }

                                    return archivados.map((grupo) => (
                                        <Grid2 key={grupo._id}>
                                            <CardGroup
                                                grupo={grupo}
                                                onEdit={() => handleEditGroup(grupo)}
                                                onArchive={() => console.log("Archivar grupo", grupo)}
                                                isArchived={true}
                                            />
                                        </Grid2>
                                    ));
                                })()}
                            </Grid2>

                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
            <ModalManageGroups
                open={openModal}
                onClose={handleCloseModal}
                onSave={handleSaveGroup}
                initialGroup={groupToEdit || { nombre: "", foto: null, descripcion: "" }}
                mode={groupToEdit ? "edit" : "create"}
            />


        </>
    )
}

export default GroupsPage
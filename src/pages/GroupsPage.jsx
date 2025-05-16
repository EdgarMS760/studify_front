import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, IconButton, Skeleton, styled, TextField, Typography } from '@mui/material';
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import CardGroup from '@components/molecules/CardGroup';
import TextCardAtom from '@components/atoms/TextCardAtom';
import AddIcon from "@mui/icons-material/Add";
import ModalManageGroups from '@components/molecules/ModalManageGroups';
import { useSnackbar } from '@libs/store/SnackbarContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createEmptyPostsCollection, deleteImage, deleteImageByUrl, uploadImageAndGetUrl } from '@libs/helpers/firebaseUtils';
import { archiveGroup, dearchiveGroup, getGroups, postGroup, updateGroup } from '@services/groupService';
import { useAuth } from '@libs/store/AuthProvider';
const GroupsPage = () => {
    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";
    const [gruposActivos, setGruposActivos] = useState([
    ]);
    const [gruposArchivados, setGruposArchivados] = useState([
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
        let fileRef;
        if (groupData.mode === "edit") {
            console.log("Actualizar grupo:", groupToEdit);

            const oldImageURL = groupToEdit.foto || null;
            try {
                setLoading(true);

                let picURL = groupData.foto || null;

                // Subir imagen si es nueva
                if (groupData.foto && typeof groupData.foto !== "string") {
                    const { url, fileRef: uploadedRef } = await uploadImageAndGetUrl(
                        groupData.foto,
                        "groupPics"
                    );
                    picURL = url;
                    fileRef = uploadedRef;
                }

                const response = await updateGroup(groupData._id, {
                    nombre: groupData.nombre,
                    descripcion: groupData.descripcion,
                    foto: picURL,
                });

                // Borrar la imagen anterior si fue reemplazada y era de Firebase
                if (
                    oldImageURL &&
                    oldImageURL !== picURL &&
                    oldImageURL.includes("firebasestorage.googleapis.com")
                ) {
                    await deleteImageByUrl(oldImageURL);
                }
                showSnackbar(response.message, "success");

            } catch (err) {
                console.error("Error al registrar:", err);
                const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
                showSnackbar(message, "error");

                //se elimina la imagen si hubo un error en el post
                if (fileRef) {
                    await deleteImage(fileRef);
                }

            } finally {
                setLoading(false);
            }
        } else {

            try {
                setLoading(true);

                let picURL = groupData.foto || null;

                // Subir imagen si es nueva
                if (groupData.foto && typeof groupData.foto !== "string") {
                    const { url, fileRef: uploadedRef } = await uploadImageAndGetUrl(
                        groupData.foto,
                        "groupPics"
                    );
                    picURL = url;
                    fileRef = uploadedRef;
                }

                const response = await postGroup({
                    nombre: groupData.nombre,
                    descripcion: groupData.descripcion,
                    foto: picURL,
                });
                const newGroup = response.group;

                await createEmptyPostsCollection(newGroup._id);

                showSnackbar(response.message, "success");


            } catch (err) {
                console.error("Error al registrar:", err);
                const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
                showSnackbar(message, "error");

                //se elimina la imagen si hubo un error en el post
                if (fileRef) {
                    await deleteImage(fileRef);
                }

            } finally {
                setLoading(false);
            }
        }
        fetchGroups(); // Refrescar la lista de grupos después de crear uno nuevo

        handleCloseModal();
    };
    const handleArchiveGroup = async (groupData) => {

        const idGroup = groupData._id;

        setLoading(true);
        try {
            const response = await archiveGroup(idGroup);
            showSnackbar("Grupo archivado con éxito", "success");
            fetchGroups();
        } catch (error) {
            console.error("Error al archivar el grupo:", error);
            const message = error.response?.data?.error || "Error al archivar el grupo.";
            setLoading(false);
            showSnackbar(message, "error");
        }
    }
    const handleDearchiveGroup = async (groupData) => {

        const idGroup = groupData._id;

        setLoading(true);
        try {
            const response = await dearchiveGroup(idGroup);
            showSnackbar("Grupo desarchivado con éxito", "success");
            fetchGroups();
        } catch (error) {
            console.error("Error al desarchivar el grupo:", error);
            const message = error.response?.data?.error || "Error al desarchivar el grupo.";
            setLoading(false);
            showSnackbar(message, "error");
        }
    }
    const fetchGroups = async () => {
        setLoading(true);
        try {
            const { groups, total, page } = await getGroups();
            setGruposActivos(groups);
        } catch (error) {
            console.error("Error al obtener grupos:", error);
        }
        try {
            const { groups, total, page } = await getGroups(1, 10, "archivado");
            setGruposArchivados(groups);
        } catch (error) {
            console.error("Error al obtener grupos:", error);
        }
        setLoading(false);
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

                                    if (gruposActivos.length === 0) {
                                        return (
                                            <Typography variant="body1" sx={{ padding: 2 }}>
                                                No hay grupos activos.
                                            </Typography>
                                        );
                                    }

                                    return (
                                        <>
                                            {gruposActivos.map((grupo) => (
                                                <Grid2 key={grupo._id}>
                                                    <CardGroup
                                                        grupo={grupo}
                                                        onEdit={() => handleEditGroup(grupo)}
                                                        onArchive={handleArchiveGroup}
                                                    />
                                                </Grid2>
                                            ))}

                                            {/* Botón para crear nuevo grupo*/}
                                            {isTeacher && (


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
                                            )}
                                        </>
                                    );
                                })()}
                            </Grid2>

                        </>
                    )}
                {isTeacher && (
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
                                <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                    <Grid2 container spacing={2} sx={{ padding: 2 }}>
                                        {gruposArchivados.length === 0 ? (
                                            <Typography variant="body1" sx={{ padding: 2 }}>
                                                No hay grupos archivados.
                                            </Typography>
                                        ) : (
                                            gruposArchivados.map((grupo) => (
                                                <Grid2 key={grupo._id}>
                                                    <CardGroup
                                                        grupo={grupo}
                                                        onEdit={() => handleEditGroup(grupo)}
                                                        onArchive={handleDearchiveGroup}
                                                        isArchived={true}
                                                    />
                                                </Grid2>
                                            ))
                                        )}
                                    </Grid2>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>)}
            </Box>
            {isTeacher && (

                <ModalManageGroups
                    open={openModal}
                    onClose={handleCloseModal}
                    onSave={handleSaveGroup}
                    initialGroup={groupToEdit || { nombre: "", foto: null, descripcion: "" }}
                    mode={groupToEdit ? "edit" : "create"}
                />
            )}


        </>
    )
}

export default GroupsPage
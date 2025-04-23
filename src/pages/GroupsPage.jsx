import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, IconButton, styled, TextField, Typography } from '@mui/material';
import clsx from 'clsx'
import React, { useState } from 'react'
import CardGroup from '@components/molecules/CardGroup';
import TextCardAtom from '@components/atoms/TextCardAtom';
import AddIcon from "@mui/icons-material/Add";
import ModalManageGroups from '@components/molecules/ModalManageGroups';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GroupsPage = () => {
    const [grupos, setGrupos] = useState([
        { id: 1, name: 'Español', image: 'https://placehold.co/40', estado: 'no archivado' },
        { id: 2, name: 'Mates', image: 'https://placehold.co/40', estado: 'archivado' },
        { id: 3, name: 'Inglés', image: 'https://placehold.co/40', estado: 'archivado' },
        { id: 4, name: 'Historia', image: 'https://placehold.co/40', estado: 'archivado' },
        { id: 5, name: 'Ciencias', image: 'https://placehold.co/40', estado: 'archivado' },
        { id: 6, name: 'Física', image: 'https://placehold.co/40', estado: 'archivado' },
        { id: 7, name: 'Química', image: 'https://placehold.co/40', estado: 'archivado' },
        { id: 8, name: 'Biología', image: 'https://placehold.co/40', estado: 'no archivado' },
        { id: 9, name: 'Geografía', image: 'https://placehold.co/40', estado: 'no archivado' },
        { id: 10, name: 'Arte', image: 'https://placehold.co/40', estado: 'no archivado' }
    ]);

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

    const handleSaveGroup = (groupData) => {
        if (groupToEdit) {
            alert("Grupo editado:", groupData);
            console.log("Actualizar grupo:", groupData);
        } else {
            alert("Grupo creado:", groupData);
            console.log("Crear grupo:", groupData);
        }

        handleCloseModal();
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
                    {grupos
                        .filter((grupo) => grupo.estado === "no archivado")
                        .map((grupo) => (
                            <Grid2 item key={grupo.id}>
                                <CardGroup
                                    grupo={grupo}
                                    onEdit={() => handleEditGroup(grupo)}
                                    onArchive={() => console.log("Archivar grupo", grupo)}
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
                                {grupos
                                    .filter((grupo) => grupo.estado === "archivado")
                                    .map((grupo) => (
                                        <Grid2 item key={grupo.id}>
                                            <CardGroup
                                                grupo={grupo}
                                                onEdit={() => handleEditGroup(grupo)}
                                                onArchive={() => console.log("Archivar grupo", grupo)}
                                                isArchived={true}
                                            />
                                        </Grid2>
                                    ))}

                            </Grid2>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
            <ModalManageGroups
                open={openModal}
                onClose={handleCloseModal}
                onSave={handleSaveGroup}
                initialGroup={groupToEdit || { name: "", image: null }}
                mode={groupToEdit ? "edit" : "create"}
            />


        </>
    )
}

export default GroupsPage
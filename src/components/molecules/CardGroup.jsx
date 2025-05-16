import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Popover,
    MenuItem,
    Tooltip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router';
import { useAuth } from '@libs/store/AuthProvider';
import { ROUTES } from '@libs/constants/routes';
const CardGroup = ({ grupo, onEdit, onArchive, isArchived = false }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";
    const handleMenuClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        handleMenuClose(event);
        onEdit(grupo);
    };

    const handleArchiveClick = (event) => {
        event.stopPropagation();
        handleMenuClose(event);
        onArchive(grupo);
    };

    const handleGroupClick = () => {
        navigate(ROUTES.GROUP_DETAIL(grupo._id));
    };

    const ActiveGroupCard = ({ grupo, onEdit, onArchive, onClick, }) => {

        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuClick = (e) => { e.stopPropagation(); setAnchorEl(e.currentTarget); };
        const handleMenuClose = (e) => { e.stopPropagation(); setAnchorEl(null) };
        return (
            <Tooltip title={grupo.descripcion} placement="bottom">

                <Box
                    onClick={onClick}
                    sx={{
                        position: 'relative',
                        width: {
                            xs: 70,
                            sm: 90,
                            md: 110,
                            lg: 130,
                            xl: 150,
                        },
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 1,
                        bgcolor: 'background.paper',
                        cursor: 'pointer'
                    }}
                >


                    <Box
                        component="img"
                        src={grupo.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(grupo.nombre)}`}
                        alt={`Grupo ${grupo.nombre}`}
                        sx={{
                            width: '100%',
                            height: {
                                xs: 40,
                                sm: 50,
                                md: 90,
                                lg: 100,
                                xl: 120,
                            },
                            objectFit: 'cover',
                            borderBottom: '1px solid #eee',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px'
                        }}
                    />


                    <Box sx={{ p: 1, textAlign: 'center' }}>
                        <Typography
                            variant="body2"
                            fontWeight="bold"
                            fontFamily="Montserrat"
                            noWrap
                        >
                            {grupo.nombre}
                        </Typography>
                    </Box>
                    {isTeacher && (<>
                        <IconButton
                            onClick={handleMenuClick}
                            sx={{
                                position: 'absolute',
                                width: {
                                    xs: 25,
                                    sm: 25,
                                    md: 30,
                                    xl: 40,
                                },
                                height: {
                                    xs: 25,
                                    sm: 25,
                                    md: 30,
                                    xl: 40,
                                },
                                top: 4,
                                right: 4,
                                zIndex: 2,
                                backgroundColor: 'gray',
                                opacity: 0.33,
                                '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                            }}
                        >
                            <MoreHorizIcon fontSize="small" />
                        </IconButton>

                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem onClick={onEdit}>Editar</MenuItem>
                            <MenuItem onClick={onArchive}>Archivar</MenuItem>
                        </Popover></>
                    )}
                </Box>
            </Tooltip>
        );
    };
    const ArchivedGroupCard = ({ grupo, onArchive }) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
        const handleMenuClose = () => setAnchorEl(null);

        return (
            <Box
                sx={{
                    position: 'relative',
                    width: 200,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 1,
                    bgcolor: 'background.paper',
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton
                    onClick={handleMenuClick}
                    sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        zIndex: 2,
                    }}
                >
                    <MoreHorizIcon fontSize="small" />
                </IconButton>

                <Box
                    sx={{
                        p: 1,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        fontFamily="Montserrat"
                    >
                        {grupo.nombre}
                    </Typography>
                </Box>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={onArchive}>Desarchivar</MenuItem>
                </Popover>
            </Box>
        );
    };
    return isArchived ? (
        <ArchivedGroupCard
            grupo={grupo}
            onArchive={handleArchiveClick}
        />
    ) : (
        <ActiveGroupCard
            grupo={grupo}
            onEdit={handleEditClick}
            onArchive={handleArchiveClick}
            onClick={handleGroupClick}
        />
    );
};

export default CardGroup;

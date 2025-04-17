import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Popover,
    MenuItem,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router';

const CardGroup = ({ grupo, onEdit, onArchive }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

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
        navigate(`/group/${grupo.id}`);
    };

    return (
        <Box
            onClick={handleGroupClick}
            sx={[
                (theme) => ({
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.1s ease-in-out',
                    '&:hover': { transform: 'scale(1.02)' },
                    backgroundColor: '#fff',

                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: theme.vars.palette.secondary.strong,
                    }),
            ]}
        >
            <IconButton
                onClick={handleMenuClick}
                sx={[
                    (theme) => ({
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        zIndex: 2,
                        backgroundColor: "gray",
                        opacity: 0.33,
                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                       
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            backgroundColor: "gray",
                            opacity: 0.33,
                            '&:hover': { backgroundColor: 'black' }
                        }),
                ]}
            >
                <MoreHorizIcon fontSize="small" />
            </IconButton>

            <Box
                component="img"
                src={grupo.imagen}
                alt={`Grupo ${grupo.nombre}`}
                sx={{
                    height: 100,
                    width: '100%',
                    objectFit: 'cover',
                    borderBottom: '1px solid #eee',
                    borderRadius: '0px 0px 10px 10px',
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

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleEditClick}>Editar</MenuItem>
                <MenuItem onClick={handleArchiveClick}>Archivar</MenuItem>
            </Popover>
        </Box>
    );
};

export default CardGroup;

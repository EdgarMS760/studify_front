import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            className="w-screen h-screen flex flex-col items-center justify-center px-4 text-center"
            sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            })}
        >
            <img
                src="/Logo.png"
                alt="Studify Logo"
                className=" mx-auto mb-6"
            />
            <Typography variant="h1" fontWeight="bold" fontSize={{ xs: 72, sm: 96 }}>
                ¡OOOPS!
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Página no encontrada
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
                Lo sentimos, la página que estás buscando no existe o fue movida.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};

export default NotFoundPage;

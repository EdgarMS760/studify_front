import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, useTheme } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { Google, GitHub, Facebook } from '@mui/icons-material';
import FormLogin from '@components/organisms/FormLogin';
import FormRegister from '@components/organisms/FormRegister';
import TextCardAtom from '@components/atoms/TextCardAtom';
import clsx from 'clsx';

const AuthGate = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <Box
            className="w-screen h-screen flex justify-center"
            sx={[
                {
                    backgroundColor: "white",
                },
                (theme) =>
                    theme.applyStyles("dark", {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}
        >
            <div className="">
            
                <Typography variant="h5" sx={{ mb: 2, color: (theme) => theme.vars.palette.text.primary }}>
                    {isRegistering ? 'Registro' : 'Inicio de sesión'}
                </Typography>

            {isRegistering ? (
                <FormRegister onToggle={() => setIsRegistering(false)} />
            ) : (
                <FormLogin onToggle={() => setIsRegistering(true)} />
            )}
            </div>
        </Box>

    );
};

export default AuthGate;

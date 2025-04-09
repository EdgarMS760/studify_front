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

    const theme = useTheme();
    const bgColor = theme.palette.mode === 'dark' ? 'bg-neutral-800' : 'bg-white';
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center"   style={{
            backgroundColor: 'var(--palette-background-default)',
            color: 'var(--palette-text-primary)',
          }}>
            <Typography variant="h5" sx={[
                (theme) => ({
                    color: theme.vars.palette.text.primary,
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        color: theme.vars.palette.text.primary,
                    }),
            ]}>
                {isRegistering ? 'Registro' : 'Inicio de sesión'}
            </Typography>
            {isRegistering ? (
                <FormRegister onToggle={() => setIsRegistering(false)} />
            ) : (
                <FormLogin onToggle={() => setIsRegistering(true)} />
            )}
        </div>
    );
};

export default AuthGate;

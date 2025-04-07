import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { Google, GitHub, Facebook } from '@mui/icons-material';
import FormLogin from '@components/organisms/FormLogin';
import FormRegister from '@components/organisms/FormRegister';
import TextCardAtom from '@components/atoms/TextCardAtom';

const AuthGate = () => {
    const [isRegistering, setIsRegistering] = useState(false);


    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900">
            <Typography variant="h5" sx={{ mt: 4, color: 'black' }}>
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

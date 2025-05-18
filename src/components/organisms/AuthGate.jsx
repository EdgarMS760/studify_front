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
            className="flex justify-center"
            
        >
            <div>
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

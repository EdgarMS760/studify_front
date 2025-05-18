import { Box, useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';


const LoginLayout = () => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === 'dark' ? 'bg-neutral-800' : 'bg-white';
  return (
    <Box className={clsx("")}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box className={clsx("mt-6 rounded-lg  text-center" )}>
        <img
          src="/Logo.png"
          alt="Studify Logo"
          className="w-48 mx-auto mb-6"
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default LoginLayout;
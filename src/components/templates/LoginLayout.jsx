import { Box, useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';


const LoginLayout = () => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === 'dark' ? 'bg-neutral-800' : 'bg-white';
  return (
    <div className={clsx("flex items-center justify-center min-h-screen w-screen", bgColor)}>
      <div className={clsx("p-6 rounded-lg shadow-md text-center", bgColor)}>
        <img
          src="/Logo.png"
          alt="Studify Logo"
          className="w-48 mx-auto mb-6"
        />
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
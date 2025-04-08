import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';


const LoginLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden min-h-full bg-white ">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
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
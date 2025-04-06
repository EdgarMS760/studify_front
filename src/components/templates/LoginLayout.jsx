import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';


const LoginLayout = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: 700,
          backgroundColor: '#ffffff',
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <img src="/Logo.png" alt="Studify Logo" style={{
          width: 200,
    
          margin: '0 auto 20px',
    
          display: 'block',
          }}
          />

        <Outlet />
      </Box>
    </Box>
  );
};

export default LoginLayout
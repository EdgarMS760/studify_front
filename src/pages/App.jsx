import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import Router from '@routes/Router';
import { SnackbarProvider } from '@libs/store/SnackbarContext';
import { AuthProvider } from '@libs/store/AuthProvider';
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme} defaultMode="system" noSsr>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

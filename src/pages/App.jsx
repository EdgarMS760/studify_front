import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import Router from '@routes/Router';
import { SnackbarProvider } from '@libs/store/SnackbarContext';
import { AuthProvider } from '@libs/store/AuthProvider';
import { NavigationProvider } from '@libs/store/NavigationContext';
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme} defaultMode="system" noSsr>
        <NavigationProvider>
          <SnackbarProvider>
            <Router />
          </SnackbarProvider>
        </NavigationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

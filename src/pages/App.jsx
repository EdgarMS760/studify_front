import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import Router from '@routes/Router';
function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router />
    </ThemeProvider>
  );
}

export default App;

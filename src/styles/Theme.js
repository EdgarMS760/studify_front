
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 600,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  // },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Arial", sans-serif',
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#FD841F',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#d9d9d9',
    },}
});

export default theme;

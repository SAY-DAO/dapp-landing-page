import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#130f05',
      paper: '#08060287',
    },
    secondary: {
      main: '#ffeb90',
    },

    error: {
      main: '#d27d5e',
    },
  },

  typography: {
    // fontFamily: 'Turret Road',
    button: {
      textTransform: '',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: 'white',
        fontSize: 12,
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 600,
      lg: 960,
      xl: 1920,
    },
  },
});

export default darkTheme;

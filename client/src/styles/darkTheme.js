import { createMuiTheme } from '@material-ui/core/styles';



const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
          default: '#000000',
            paper: '#131313'
        },
        secondary: {
            main: '#FFF688',
        },
    },
    typography: {
        // fontFamily: 'Turret Road',
        button: {
            textTransform: ""
        }
    },


});

export default darkTheme;
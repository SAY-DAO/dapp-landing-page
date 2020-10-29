import { createMuiTheme } from '@material-ui/core/styles';



const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#130f05',
            paper: '#080602'
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
            textTransform: ""
        }

    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: 'white',
                fontSize: 12,
            },
        }
    }


});

export default darkTheme;
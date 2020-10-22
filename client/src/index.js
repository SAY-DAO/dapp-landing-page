import React from 'react';
import ReactDOM from'react-dom';
import App from "./components/App";
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from "./styles/darkTheme";

ReactDOM.render(
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>,
        document.querySelector('#root')
) ;



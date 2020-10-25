import React from 'react';
import ReactDOM from'react-dom';
import { Provider } from 'react-redux'
import App from "./components/App";
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from "./styles/darkTheme";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from './reducers'

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware())
)

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </Provider>,

        document.querySelector('#root')
) ;



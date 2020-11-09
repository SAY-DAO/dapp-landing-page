import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './components/App';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './styles/darkTheme';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

const env = process.env.ENVIRONMENT || 'local';
process.env.UV_THREADPOOL_SIZE = 128;

// Sentry
Sentry.init({
  dsn: 'https://542c7ecc94d5481281209b4348de290c@sentry.say.company/8',
  integrations: [new Integrations.BrowserTracing()],
  environment: env,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </Provider>,

  document.querySelector('#root'),
);

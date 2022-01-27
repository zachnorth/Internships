import 'bootstrap/dist/css/bootstrap.css';

import './assets/css/nucleo-icons.css';
import './assets/css/black-dashboard-react.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import { ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);
const persistor = persistStore(store);

const rootElement = document.getElementById('root');


// ReactDOM.render(
//   <BrowserRouter basename={baseUrl}>
//     <App />
//   </BrowserRouter>,
//   rootElement
// );

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App persistor={persistor} />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  rootElement
);


registerServiceWorker();


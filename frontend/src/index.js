import React from 'react';
import ReactDOM from 'react-dom/client';
import reduxStore from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { persistor, store } = reduxStore();
root.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </PersistGate>
  </Provider>
);


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import productOrderReducer from './store/reducers/productOrderReducer';
import shoppingReducer from './store/reducers/shoppingReducer';
import authReducer from './store/reducers/authReducer';
import checkoutReducer from './store/reducers/checkoutReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// To enable Redux Developer Tools (only in development mode)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;

// Combine the reducers to be used
const mainReducer = combineReducers({
  product: productOrderReducer,
  shopping: shoppingReducer,
  auth: authReducer,
  checkout: checkoutReducer
});

// Create a Persist Configuration for the Reducers
const persistConfig = {
  key: 'root',
  storage,                        // imported above
  whitelist: ['shopping', 'auth', 'checkout'] // whitelist of reducers to persist, stored as strings
}

// Create Persistent Main Reducer
const persistentReducer = persistReducer(persistConfig, mainReducer);

// Create Redux Store
const store = createStore(persistentReducer, composeEnhancers(
  // To access dispatch method
  applyMiddleware(thunk)
));

// Create a Persistent Store
const persistentStore = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistentStore}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

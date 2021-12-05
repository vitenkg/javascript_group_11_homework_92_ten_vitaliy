import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import App from './App';
import usersReducer from './store/Reducers/usersReducer';

import {Router} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {createTheme, MuiThemeProvider} from "@material-ui/core";

import history from './history';
import 'react-toastify/dist/ReactToastify.css';

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('shopState', serializedState);
    } catch (e) {
        console.log('Could not save state');
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('shopState');

        if(serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (e) {

    }
};

const rootReducer = combineReducers({
    users: usersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk)
    ));

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users
    });
});

const theme = createTheme({
    props: {
        MuiTextField: {
            variant: "outlined",
            fullWidth: true,
        },
    },
});

const app = (
    <Provider store={store}>
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <ToastContainer/>
                <App/>
            </MuiThemeProvider>
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
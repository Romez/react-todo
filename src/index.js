import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from './store';
import routes from './routes';
import {LS, setAuthToken} from './utils';
import {setCurrentUser} from './pages/auth/actions';
import jwt from 'jsonwebtoken';

const store = configureStore();

if (LS.get('token')) {
    setAuthToken(LS.get('token'));
    store.dispatch(setCurrentUser(jwt.decode(LS.get('token'))));
}

ReactDom.render((
    <Provider store={store}>
        <BrowserRouter >
            { routes }
        </BrowserRouter>
    </Provider>),
document.querySelector('#app')
);

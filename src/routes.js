import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './app';

import {HomeRoute} from './pages/home';
import {ContactsRoute} from './pages/contacts';
import {TodoRoute} from './pages/todo';
import ErrorPage from './pages/error';

export default (
    <App>
        <Switch>
            {HomeRoute}
            {ContactsRoute}
            {TodoRoute}
            <Route path="*" component={ErrorPage}/>
        </Switch>
    </App>
);

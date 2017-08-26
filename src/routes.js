import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './app';

import {HomeRoute} from './pages/home';
import {ContactsRoute} from './pages/contacts';
import {TodoRoute} from './pages/todo';
import {AuthRoute} from './pages/auth';
import {RubricsRoute} from './pages/rubrics';
import ErrorPage from './pages/error';


export default (
    <App>
        <Switch>
            {HomeRoute}
            {RubricsRoute}
            {ContactsRoute}
            {TodoRoute}
            {AuthRoute}
            <Route component={ErrorPage}/>
        </Switch>
    </App>
);

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './app';

import {HomeRoute} from './pages/home';
import {ContactsRoute} from './pages/contacts';
import {TodoRoute} from './pages/todo';
import {AuthRoute} from './pages/auth';
import {RubricsRoute} from './pages/rubrics';
import {ArticleRoute} from './pages/articles';
import {SettingsRoutes} from './pages/settings';
import ErrorPage from './pages/error';

export default (
    <App>
        <Switch>
            {HomeRoute}
            {RubricsRoute}
            {ContactsRoute}
            {TodoRoute}
            {AuthRoute}
            {ArticleRoute}
            {SettingsRoutes}
            <Route component={ErrorPage}/>
        </Switch>
    </App>
);

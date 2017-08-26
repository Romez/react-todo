import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from './auth';
import LoginPage from './login';
import Logout from './logout';

export default (
    <Switch>
        <Route exact={true} path={AuthPage.path} component={AuthPage}/>
        <Route path={LoginPage.path} component={LoginPage}/>
        <Route path={Logout.path} component={Logout}/>
    </Switch>
);

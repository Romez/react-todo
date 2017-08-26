import React from 'react';
import { Route } from 'react-router-dom';
import AdminPage from './admin';

export default (
    <Route exact={true} path={AdminPage.path} component={AdminPage}/>
);

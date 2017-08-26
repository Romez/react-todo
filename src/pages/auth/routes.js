import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './login';


export default (
    <Route path={LoginPage.path} component={LoginPage}/>
);

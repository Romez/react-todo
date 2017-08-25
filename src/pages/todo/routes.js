import React from 'react';
import { Route } from 'react-router-dom';
import TodoPage from './todo';

export default (
    <Route exact={true} path={TodoPage.path} component={TodoPage}/>
);

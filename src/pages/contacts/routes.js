import React from 'react';
import { Route } from 'react-router-dom';
import ContactsPage from './ContactsPage';

export default (
    <Route exact={true} path={ContactsPage.path} component={ContactsPage}/>
);

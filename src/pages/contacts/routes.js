import React from 'react';
import { Route } from 'react-router-dom';
import ContactsPage from './contacts';

export default (
    <Route exact={true} path={ContactsPage.path} component={ContactsPage}/>
);

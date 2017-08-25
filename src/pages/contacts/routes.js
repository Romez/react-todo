import React from 'react';
import { Route } from 'react-router-dom';
import ContactsPage from './contacts';

export default (
    <Route path={ContactsPage.path} component={ContactsPage}/>
);

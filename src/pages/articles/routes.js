import React from 'react';
import {Route} from 'react-router-dom';
import Article from './article';

export default (
    <Route path={Article.path + '/:id'} component={Article}/>
);

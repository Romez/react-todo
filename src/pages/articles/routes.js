import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Article from './article';

class ArticleRoutes extends React.Component {
    static path = '/article';
    render() {
        return (
            <div>
                <Switch>
                    <Route path={Article.path + '/:id'} component={Article} />
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={ArticleRoutes.path} component={ArticleRoutes}/>
);

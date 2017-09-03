import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Article from './ArticlePage';
import ArticleEditPage from './ArticleEditPage';
import ArticleAddPage from './ArticleAddPage';

class ArticleRoutes extends React.Component {
    static path = '/article';
    render() {
        return (
            <div>
                <Switch>
                    <Route path={ArticleEditPage.path + '/:id'} component={ArticleEditPage} />
                    <Route path={ArticleAddPage.path} component={ArticleAddPage} />
                    <Route path={Article.path + '/:id'} component={Article} />
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={ArticleRoutes.path} component={ArticleRoutes}/>
);

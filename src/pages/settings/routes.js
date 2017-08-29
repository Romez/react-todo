import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import {ArticleAddPage} from './article';

class SettingsRoutes extends React.Component {
    static path = '/settings';
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={SettingsPage.path} component={SettingsPage}/>
                    <Route path={ArticleAddPage.path} component={ArticleAddPage}/>
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={SettingsRoutes.path} component={SettingsRoutes}/>
);

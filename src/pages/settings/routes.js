import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import RubricsListPage from './RubricsListPage';
import ArticlesListPage from './ArticlesListPage';

class SettingsRoutes extends React.Component {
    static path = '/settings';
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={SettingsPage.path} component={SettingsPage}/>
                    <Route exact path={RubricsListPage.path} component={RubricsListPage}/>
                    <Route exact path={ArticlesListPage.path} component={ArticlesListPage}/>
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={SettingsRoutes.path} component={SettingsRoutes}/>
);

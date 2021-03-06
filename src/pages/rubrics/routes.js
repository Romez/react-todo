import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RubricsPage from './RubricsPage';
import RubricPage from './RubricPage';
import AddRubricPage from './AddRubricPage';
import EditRubricPage from './EditRubricPage';

class RubricRoutes extends React.Component {
    static path = '/rubrics';
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={RubricsPage.path} component={RubricsPage}/>
                    <Route exact path={AddRubricPage.path} component={AddRubricPage}/>
                    <Route path={EditRubricPage.path + '/:slug'} component={EditRubricPage}/>
                    <Route exact path={RubricPage.path} component={RubricPage}/>
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={RubricRoutes.path} component={RubricRoutes}/>
);

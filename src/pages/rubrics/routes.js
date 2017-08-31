import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RubricsPage from './RubricsPage';
import RubricPage from './RubricPage';
import DeleteRubricPage from './DeleteRubricPage';
import AddRubricPage from './AddRubricPage';
import EditRubricPage from './EditRubricPage';

class RubricRoutes extends React.Component {
    static path = '/rubrics';
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={RubricsPage.path} component={RubricsPage}/>
                    <Route exact path={DeleteRubricPage.path} component={DeleteRubricPage}/>
                    <Route exact path={AddRubricPage.path} component={AddRubricPage}/>
                    <Route exact path={EditRubricPage.path} component={EditRubricPage}/>
                    <Route path={RubricPage.path} component={RubricPage}/>
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={RubricRoutes.path} component={RubricRoutes}/>
);

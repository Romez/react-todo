import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RubricsPage from './rubrics';
import RubricPage from './rubric';

class RubricRoutes extends React.Component {
    static path = '/rubrics';
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={RubricsPage.path} component={RubricsPage}/>
                    <Route path={RubricPage.path} component={RubricPage}/>
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={RubricRoutes.path} component={RubricRoutes}/>
);

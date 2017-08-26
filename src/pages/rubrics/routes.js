import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RubricsPage from './rubrics';
import RubricItemPage from './rubric-item';

class RubricRoutes extends React.Component {
    static path = '/rubrics';
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={RubricsPage.path} component={RubricsPage}/>
                    <Route path={RubricItemPage.path} component={RubricItemPage}/>
                </Switch>
            </div>
        );
    }
}

export default (
    <Route path={RubricRoutes.path} component={RubricRoutes}/>
);

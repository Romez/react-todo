import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {LoginPage} from '../auth';
import RubricsList from './RubricsList';
import {AddRubricPage} from '../rubrics';


class RubricsListPage extends React.Component {
    static path = '/settings/rubrics';

    componentWillMount() {
        if (!this.props.auth.isAuth) {
            this.props.history.push(LoginPage.path);
        }
    }


    render() {
        return (
            <section id="RubricsListPage">
                <h2 className="title">Рубрики</h2>

                <LinkContainer to={AddRubricPage.path}>
                    <Button bsStyle="success">Новая рубрика</Button>
                </LinkContainer>

                <RubricsList
                    dispatch={this.props.dispatch}
                    rubrics={this.props.rubrics}
                    history={this.props.history}
                />

            </section>
        );
    }
}

RubricsListPage.propTypes = {
    rubrics: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics,
        settings: state.settings,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(RubricsListPage);

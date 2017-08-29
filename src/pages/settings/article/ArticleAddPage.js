import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ArticleAddForm from './ArticleAddFrom';
import {LoginPage} from '../../auth';

class ArticleAddPage extends React.Component {
    static path ='/settings/article/add';

    componentWillMount() {
        if (!this.props.auth.isAuth) {
            this.props.history.push(LoginPage.path);
        }
    }

    render() {
        const {rubrics} = this.props.rubrics;

        return (
            <section id="settingsAddPage">
                <h2 className="title">
                    Добавить статью
                </h2>

                <ArticleAddForm
                    rubrics={rubrics}
                    dispatch={this.props.dispatch}
                    history={this.props.history}
                    errors={this.props.settings.errors}
                />
            </section>
        );
    }
}

ArticleAddPage.propTypes = {
    rubrics: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        settings: state.settings,
        rubrics: state.rubrics,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(ArticleAddPage);


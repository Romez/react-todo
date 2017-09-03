import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {LoginPage} from '../auth';
import {getAllArticles} from '../articles/actions';
import {ArticleAddPage} from '../articles';
import ArticlesList from './ArticlesList';

class ArticlesListPage extends React.Component {
    static path='/settings/articles';

    componentWillMount() {
        const {auth, history, dispatch} = this.props;
        if (!auth.isAuth) {
            history.push(LoginPage.path);
        }
        dispatch(getAllArticles());
    }

    render() {
        return (
            <section id="ArticlesListPage">
                <h2 className="title">Статьи</h2>

                <LinkContainer to={ArticleAddPage.path}>
                    <Button bsStyle="success">Новая статья</Button>
                </LinkContainer>

                <ArticlesList
                    article={this.props.article}
                    history={this.props.history}
                    dispatch={this.props.dispatch}
                />
            </section>
        );
    }
}

ArticlesListPage.propTypes = {
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        settings: state.settings,
        article: state.article,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(ArticlesListPage);

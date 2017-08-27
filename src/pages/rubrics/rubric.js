import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getRubric, getRubricArticles} from './actions';
import ArticlePage from '../articles/article';
import {unix} from 'moment';

class RubricPage extends React.Component {
    static path = '/rubrics/:slug';

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {slug} = this.props.match.params;
        this.props.dispatch(getRubric(slug));
        this.props.dispatch(getRubricArticles(slug));
    }

    renderArticle(item, i) {
        const moment = unix(item.created_at);
        return (
            <Link to={ `${ArticlePage.path}/${item.article_id}` } key={i} className="article">
                <time>
                    {moment.format('D.MM.gggg')}
                </time>
                <div className="title">
                    {item.title}
                </div>
            </Link>
        );
    }

    render() {
        const {rubric, rubricArticles} = this.props.rubrics;
        return (
            <div>
                <h2 className="rubricName">Рубрика {rubric.name}</h2>
                <div className="articles">
                    {rubricArticles.map(this.renderArticle.bind(this))}
                </div>
            </div>
        );
    }
}

RubricPage.propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    rubrics: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(RubricPage);

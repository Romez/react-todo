import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {unix} from 'moment';
import renderHTML from 'react-render-html';
import {getArticle} from './actions';
import './styles.less';

class ArticlePage extends React.Component {
    static path = '/article';

    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getArticle(id));
    }

    render() {
        const {title, body, created_at, preview} = this.props.article.article;
        const moment = unix(created_at);
        return (
            <section id="article">
                <h2>
                    {title}
                </h2>
                <time>
                    {moment.format('D.MM.gggg')}
                </time>
                <article>
                    <img className="preview" src={preview} alt="фото"/>
                    {renderHTML(String(body))}
                </article>

            </section>
        );
    }
}

ArticlePage.propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        article: state.article
    };
}

export default connect(mapStateToProps)(ArticlePage);

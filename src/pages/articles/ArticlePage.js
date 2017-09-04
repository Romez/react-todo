import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {unix} from 'moment';
import renderHTML from 'react-render-html';
import {getArticle} from './actions';
import './styles.less';

class ArticlePage extends React.Component {
    static path = '/article';

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        this.setState({loading: true});

        const {id} = this.props.match.params;
        this.props.dispatch(getArticle(id)).then(() => this.setState({loading: false}));
    }

    render() {
        const {title, body, created_at} = this.props.article.article;
        const moment = unix(created_at);

        return (
            <section id="article">
                {this.state.loading ? 'loading...' :
                    <div>
                        <h2>
                            {title}
                        </h2>
                        <time>
                            {moment.format('D.MM.gggg')}
                        </time>
                        <article>
                            {renderHTML(String(body))}
                        </article>
                    </div>
                }
            </section>
        );
    }
}

ArticlePage.propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        article: state.article,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(ArticlePage);

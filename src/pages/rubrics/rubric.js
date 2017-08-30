import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {unix} from 'moment';
import ReactPaginate from 'react-paginate';
import {getRubric, getRubricArticles} from './actions';
import ArticlePage from '../articles/article';
import _ from 'lodash';

class RubricPage extends React.Component {
    static path = '/rubrics/:slug';

    constructor(props) {
        super(props);
        this.state = {
            offset: 0
        };
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

    handlePageClick(data) {
        const selected = data.selected;
        const offset = Math.ceil(selected * 5);
        this.setState({offset: offset});
    }

    render() {
        const {rubric, rubricArticles} = this.props.rubrics;
        const rubrics = _.slice(rubricArticles, this.state.offset, this.state.offset + 5);
        return (
            <div>
                <h2 className="rubricName">Рубрика {rubric.name}</h2>
                <div className="articles">
                    {rubrics.map(this.renderArticle.bind(this))}

                    <ReactPaginate
                        previousLabel="&lt;"
                        nextLabel="&gt;"
                        breakLabel={<a onClick={() => { return;}}>...</a>}
                        pageCount={rubricArticles.length / 5}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick.bind(this)}
                        containerClassName="pagination"
                        subContainerClassName="pages pagination"
                        activeClassName="active"
                    />

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

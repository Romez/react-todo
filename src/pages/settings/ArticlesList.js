import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import {bindAll, slice, isEmpty} from 'lodash';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {ArticlePage, ArticleEditPage} from '../articles';
import {deleteArticle, getAllArticles} from '../articles/actions';
import {addFlashMessage} from '../../components/flash/actions';

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ['renderRow', 'delArticle', 'handlePageClick']);
        this.state = {
            offset: 0,
            perPage: 5
        };
    }

    delArticle(e) {
        e.preventDefault();
        const {id} = e.target.dataset;
        if (id) {
            const {history, dispatch} = this.props;
            dispatch(deleteArticle(id, history)).then(() => {
                if (isEmpty(this.props.article.errors)) {
                    dispatch(addFlashMessage({type: 'success', text: 'Статья удалена'}));
                    dispatch(getAllArticles(history));
                }
            });
        }
    }

    renderRow(item, i) {
        return (
            <tr key={i}>
                <td>{item.article_id}</td>
                <td>{item.rubric}</td>
                <td>{item.title}</td>
                <td>{item.created_at}</td>
                <td>
                    <Link to={`${ArticlePage.path}/${item.article_id}`}>
                        <FontAwesome name="eye"/>
                    </Link>
                    <Link to={`${ArticleEditPage.path}/${item.article_id}`}>
                        <FontAwesome name="pencil"/>
                    </Link>
                    <Link  to={`delete/${item.article_id}`}>
                        <FontAwesome data-id={item.article_id} onClick={this.delArticle} name="trash"/>
                    </Link>
                </td>
            </tr>
        );
    }

    handlePageClick(data) {
        const selected = data.selected;
        const offset = Math.ceil(selected * this.state.perPage);
        this.setState({offset: offset});
    }

    render() {
        const articles = slice(this.props.article.articles, this.state.offset, this.state.offset + this.state.perPage);
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Рубрика</th>
                        <th>Заголовок</th>
                        <th>Дата создания</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(this.renderRow)}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            {!isEmpty(articles) && <ReactPaginate
                                previousLabel="&lt;"
                                nextLabel="&gt;"
                                breakLabel={<a onClick={() => { return false; }}>...</a>}
                                pageCount={this.props.article.articles.length / this.state.perPage}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={this.handlePageClick}
                                containerClassName="pagination"
                                subContainerClassName="pages pagination"
                                activeClassName="active"
                            />}
                        </td>
                    </tr>
                </tfoot>
            </Table>
        );
    }
}

ArticlesList.propTypes = {
    article: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default ArticlesList;

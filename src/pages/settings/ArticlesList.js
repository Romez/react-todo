import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import {bindAll} from 'lodash';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {ArticlePage, ArticleEditPage} from '../articles';
import {deleteArticle, getAllArticles} from '../articles/actions';

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ['renderRow', 'delArticle']);
    }

    delArticle(e) {
        e.preventDefault();
        const {id} = e.target.dataset;
        console.log( id );
        if (id) {
            const {history, dispatch} = this.props;
            dispatch(deleteArticle(id, history)).then(() => {
                dispatch(getAllArticles(history));
            });
        }
    }

    renderRow(item, i) {
        return (
            <tr key={i}>
                <td>{item.id}</td>
                <td>{item.rubric}</td>
                <td>{item.title}</td>
                <td>{item.created_at}</td>
                <td>
                    <Link to={`${ArticlePage.path}/${item.id}`}>
                        <FontAwesome name="eye"/>
                    </Link>
                    <Link to={`${ArticleEditPage.path}/${item.id}`}>
                        <FontAwesome name="pencil"/>
                    </Link>
                    <Link  to={`delete/${item.id}`}>
                        <FontAwesome data-id={item.id} onClick={this.delArticle} name="trash"/>
                    </Link>
                </td>
            </tr>
        );
    }

    render() {
        const {articles} = this.props.article;
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

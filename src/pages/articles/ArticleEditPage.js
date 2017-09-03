import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindAll} from 'lodash';

import {getArticle, editArticle} from './actions';
import ArticleForm from './ArticleForm';

class ArticleEditPage extends React.Component {
    static path='/article/edit';

    constructor(props) {
        super(props);

        bindAll(this, ['onChange', 'onTinyMCEChange', 'onSubmit']);

        this.state = {
            rubric: '',
            title: '',
            body: '',
            id: '',
            createdAt: ''
        };
    }

    onTinyMCEChange(value) {
        this.setState({body: value});
    }

    onChange(name, value) {
        this.setState({[name]: value});
    }

    onSubmit() {
        const {title, body, id, createdAt, rubric} = this.state;
        this.props.dispatch(editArticle({title, body, id, createdAt, rubric}, this.props.history));
    }

    componentWillMount() {
        const {match, dispatch, history} = this.props;
        dispatch(getArticle(match.params.id, history)).then(() => {
            const {article} = this.props.article;
            this.setState({
                title: article.title,
                body: article.body,
                id: article.id,
                createdAt: article.created_at,
                rubric: article.rubric_id
            });
        });
    }

    render() {
        const {article} = this.props.article;
        return (
            <section id="ArticleEditPage">
                <h2 className="title">Редактировать статью ID: {article.id} </h2>

                <ArticleForm
                    article={this.props.article}
                    title={this.state.title}
                    body={this.state.body}
                    onChange={this.onChange}
                    onTinyMCEChange={this.onTinyMCEChange}
                    onSubmit={this.onSubmit}
                    rubrics={this.props.rubrics}
                />
            </section>
        );
    }
}

ArticleEditPage.propTypes = {
    article: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    rubrics: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        article: state.article,
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(ArticleEditPage);

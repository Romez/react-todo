import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindAll} from 'lodash';
import moment from 'moment';

import {addArticle} from './actions';
import {addFlashMessage} from '../../components/flash/actions';
import ArticleForm from './ArticleForm';
import {LoginPage} from '../auth';

class ArticleAddPage extends React.Component {
    static path='/article/add';

    constructor(props) {
        super(props);

        bindAll(this, ['onChange', 'onTinyMCEChange', 'onSubmit']);

        this.state = {
            rubric: '',
            title: '',
            body: ''
        };
    }

    componentWillMount() {
        if (!this.props.auth.isAuth) {
            this.props.history.push(LoginPage.path);
        }
    }

    onTinyMCEChange(value) {
        this.setState({body: value});
    }

    onChange(name, value) {
        this.setState({[name]: value});
    }

    onSubmit() {
        const {title, body, rubric} = this.state;
        const createdAt = moment().unix();
        this.props.dispatch(addArticle({title, body, createdAt, rubric}, this.props.history)).then(()=>{
            this.props.dispatch(addFlashMessage({type: 'success', text: 'Статья добавлена'}));
        });
    }

    render() {
        return (
            <section id="ArticleEditPage">
                <h2 className="title">Добавить статью</h2>

                <ArticleForm
                    article={this.props.article}
                    title={this.state.title}
                    body={this.state.body}
                    onChange={this.onChange}
                    onTinyMCEChange={this.onTinyMCEChange}
                    onSubmit={this.onSubmit}
                    rubrics={this.props.rubrics}
                    rubric={this.state.rubric}
                />
            </section>
        );
    }
}

ArticleAddPage.propTypes = {
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    rubrics: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        article: state.article,
        rubrics: state.rubrics,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(ArticleAddPage);

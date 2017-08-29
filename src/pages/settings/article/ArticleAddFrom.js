import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import moment from 'moment';
import {addArticle, skipErrors} from '../actions';

class ArticleAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rubric: '',
            title: '',
            body: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleEditorChange(e) {
        this.props.dispatch(skipErrors('body'));
        this.setState({'body': e.target.getContent()});
    }

    onChange(e) {
        const { name, value } = e.target;
        this.props.dispatch(skipErrors(name));
        this.setState({[name]: value});
    }

    submitForm(e) {
        e.preventDefault();
        const {rubric, body, title} = this.state;
        this.props.dispatch(
            addArticle( rubric, body, title, moment().unix(), this.props.history)
        );
    }

    getValidationState(name) {
        const error = this.props.errors[name];
        return error ? 'error' : null;
    }

    render() {
        const rubrics = this.props.rubrics.map( (item, i) => (
            <option key={i} value={item.id}>{item.name}</option>
        ));

        return (
            <form onSubmit={this.submitForm}>
                <FormGroup validationState={ this.getValidationState('rubric') }>
                    <ControlLabel>Рубрика</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="Выберете рубрику"
                        value={this.state.rubric}
                        onChange={this.onChange}
                        name="rubric"
                    >
                        <option disabled value="">Выберете рубрику</option>
                        {rubrics}
                    </FormControl>
                    <HelpBlock>{this.props.errors.rubric}</HelpBlock>
                </FormGroup>

                <FormGroup validationState={ this.getValidationState('title') }>
                    <ControlLabel>Заголовок</ControlLabel>
                    <FormControl
                        name="title"
                        type="text"
                        value={ this.state.title }
                        onChange={this.onChange}
                        placeholder={'Введите заголовок'}
                    />
                    <HelpBlock>{this.props.errors.title}</HelpBlock>
                </FormGroup>

                <FormGroup validationState={ this.getValidationState('body') }>
                    <ControlLabel>Статья</ControlLabel>
                    <TinyMCE
                        name="body"
                        content={this.state.body}
                        config={{
                            plugins: 'link image code',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                        }}
                        onChange={this.handleEditorChange}
                    />
                    <HelpBlock>{this.props.errors.body}</HelpBlock>
                </FormGroup>

                <Button bsStyle="primary" onClick={this.submitForm} >Добавить</Button>
            </form>
        );
    }
}

ArticleAddForm.propTypes = {
    rubrics: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default ArticleAddForm;

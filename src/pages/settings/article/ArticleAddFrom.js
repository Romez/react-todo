import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import moment from 'moment';
import {bindAll} from 'lodash';
import {addArticle, skipErrors} from '../actions';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class ArticleAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rubric: '',
            title: '',
            body: '',
            preview: '',
            file: '/img/945x200.png'
        };

        bindAll(this, ['onChange', 'onChangeFile', 'handleEditorChange', 'submitForm', 'cropend', 'cropReady', 'zoom']);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.props.dispatch(skipErrors(name));
        this.setState({[name]: value});
    }

    handleEditorChange(e) {
        this.props.dispatch(skipErrors('body'));
        this.setState({'body': e.target.getContent()});
    }

    onChangeFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                file: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    submitForm(e) {
        e.preventDefault();
        const {rubric, body, title, preview} = this.state;
        this.props.dispatch(
            addArticle( rubric, body, title, moment().unix(),  preview, this.props.history)
        );
    }

    getValidationState(name) {
        const error = this.props.errors[name];
        return error ? 'error' : null;
    }

    cropReady() {
        console.log( 'ready' );
        this.setState({
            preview: this.refs.cropper.getCroppedCanvas().toDataURL()
        });
    }

    cropend() {
        this.setState({
            preview: this.refs.cropper.getCroppedCanvas().toDataURL()
        });
    }

    zoom() {
        this.setState({
            preview: this.refs.cropper.getCroppedCanvas().toDataURL()
        });
    }

    render() {
        const rubrics = this.props.rubrics.map( (item, i) => (
            <option key={i} value={item.id}>{item.name}</option>
        ));

        return (
            <form onSubmit={this.submitForm}>
                <FormGroup>
                    <ControlLabel>Изображение</ControlLabel>
                    <img className="preview" src={this.state.preview} alt=""/>
                    <Cropper
                        ref={'cropper'}
                        src={this.state.file}
                        style={{height: 200, width: '100%'}}
                        aspectRatio={20 / 4}
                        guides={false}
                        cropend={this.cropend}
                        ready={this.cropReady}
                        zoom={this.zoom}
                    />

                    <FormControl
                        type="file"
                        onChange={this.onChangeFile}
                        name="file"
                    />
                </FormGroup>

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
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                            paste_data_images: true,
                            file_picker_callback: function(cb, value, meta) {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');

                                input.onchange = function() {
                                    const file = this.files[0];
                                    const reader = new FileReader();
                                    reader.onload = function(e) {
                                        cb(e.target.result, {
                                            alt: ''
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                };

                                input.click();
                            }
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

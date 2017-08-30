import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import moment from 'moment';
import {bindAll} from 'lodash';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import {addArticle, skipErrors} from '../actions';

import 'react-image-crop/dist/ReactCrop.css';

class ArticleAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rubric: '',
            title: '',
            body: '',
            imagePreviewUrl: '',
            dropzoneDisabled: false,
            cropDisabled: true,
            crop: {}
        };

        bindAll(this, ['onChange', 'handleEditorChange', 'submitForm', 'onDrop']);
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

    onDrop(acceptedFiles, rejectedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    imagePreviewUrl: reader.result
                });
            };
            reader.readAsDataURL(file);
        });
    }

    submitForm(e) {
        e.preventDefault();
        const {rubric, body, title, imagePreviewUrl} = this.state;
        this.props.dispatch(
            addArticle( rubric, body, title, moment().unix(), imagePreviewUrl, this.props.history)
        );
    }

    getValidationState(name) {
        const error = this.props.errors[name];
        return error ? 'error' : null;
    }

    onImageLoaded(crop) {
        // console.log('Image was loaded. Crop:', crop);
        this.setState({
            dropzoneDisabled: true,
            cropDisabled: false
        });
    }

    onCropComplete(crop, pixelCrop) {
        // console.log('Crop move complete:', crop, pixelCrop);

        const imgObject = new Image();
        imgObject.src = this.state.imagePreviewUrl;

        const canvas = document.createElement('canvas');
        canvas.width = imgObject.width;
        canvas.height = imgObject.height;
        const context = canvas.getContext('2d');

        console.log( pixelCrop );

        context.drawImage(
            imgObject,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
        const base64ImageData = canvas.toDataURL();
        this.setState({
            dropzoneDisabled: false,
            cropDisabled: true,
            imagePreviewUrl: base64ImageData
        });
    }

    render() {
        const rubrics = this.props.rubrics.map( (item, i) => (
            <option key={i} value={item.id}>{item.name}</option>
        ));

        return (
            <form onSubmit={this.submitForm}>
                <ControlLabel>Картинка</ControlLabel>
                <FormGroup>
                    <Dropzone
                        className={'dropzone'}
                        accept="image/jpeg, image/png"
                        onDrop={this.onDrop}
                        disabled={this.state.dropzoneDisabled}
                    >
                        <ReactCrop
                            src={this.state.imagePreviewUrl}
                            disabled ={this.state.cropDisabled}
                            crop={{
                                x: 20,
                                y: 5,
                                aspect: 17/4
                            }}
                            onImageLoaded={this.onImageLoaded.bind(this)}
                            onComplete={this.onCropComplete.bind(this)}
                        />
                    </Dropzone>
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
                        apiKey="0mm27xdqdxttv00qjx3rxv23htjstfaacfxkwmppp68e4d25"
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

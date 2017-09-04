import React from 'react';
import PropTypes from 'prop-types';
import {bindAll} from 'lodash';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import TinyMCEInput from 'react-tinymce-input';

class ArticleForm extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, 'onSubmit', 'getValidationState', 'onChange', 'onTinyMCEChange');
    }

    onTinyMCEChange(value) {
        this.props.onTinyMCEChange(value);
    }

    onChange(e) {
        const {name, value} = e.target;
        this.props.onChange(name, value);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    getValidationState(name) {
        if ( this.props.article.errors[name] ) {
            return 'error';
        }
        return null;
    }

    render() {
        const {title, body, rubrics, rubric, btnDisable} = this.props;

        const rubricsList = rubrics.rubrics.map( (item, i) => (
            <option key={i} value={item.id}>{item.name}</option>
        ));

        return (
            <form onSubmit={this.onSubmit} >
                <FormGroup
                    validationState={this.getValidationState('title')}
                >
                    <FormGroup validationState={ this.getValidationState('rubric') }>
                        <ControlLabel>Рубрика
                            <FormControl
                                componentClass="select"
                                placeholder="Выберете рубрику"
                                value={rubric}
                                onChange={this.onChange}
                                name="rubric"
                            >
                                <option disabled value="">Выберете рубрику</option>
                                {rubricsList}
                            </FormControl>
                            <HelpBlock>{this.props.article.errors.rubric}</HelpBlock>
                        </ControlLabel>
                    </FormGroup>

                    <ControlLabel>
                        Заголовок
                        <FormControl
                            name="title"
                            type="text"
                            value={ title }
                            onChange={this.onChange}
                            placeholder={'Введите заголовок'}
                        />
                        <HelpBlock>{this.props.article.errors.title}</HelpBlock>
                    </ControlLabel>
                </FormGroup>

                <FormGroup
                    validationState={this.getValidationState('body')}
                >
                    <ControlLabel>
                        Статья
                        <TinyMCEInput
                            name="body"
                            value={body}
                            onChange={this.onTinyMCEChange}
                            tinymceConfig={{
                                plugins: 'link image code',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                                paste_data_images: true,
                                file_picker_callback: (cb, value, meta) => {
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
                        />

                        <HelpBlock>{this.props.article.errors.body}</HelpBlock>
                    </ControlLabel>
                </FormGroup>

                <Button disabled={btnDisable} onClick={this.onSubmit}>Подтвердить</Button>

            </form>
        );
    }
}

ArticleForm.propTypes = {
    article: PropTypes.object.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onTinyMCEChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    rubrics: PropTypes.object.isRequired,
    btnDisable: PropTypes.bool
};

ArticleForm.defaultProps = {
    btnDisable: false
};

export default ArticleForm;

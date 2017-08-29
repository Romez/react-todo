import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import {Input} from '../../../components/helpers';

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
        this.setState({
            'body': e.target.getContent()
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitForm(e) {
        e.preventDefault();
    }

    render() {
        const rubrics = this.props.rubrics.map( (item, i) => (
            <option key={i} value={item.id}>{item.name}</option>
        ));

        return (
            <form onSubmit={this.submitForm}>
                <div className="groupWrapper">
                    <label>
                        <div className="label">
                            Рубрика
                        </div>
                        <select name="rubric" value={this.state.rubric} onChange={this.onChange}>
                            <option value="" disabled>Выберете рубрику</option>
                            {rubrics}
                        </select>
                    </label>
                </div>

                <label>
                    Заголовок
                    <Input
                        divClasses={'groupWrapper'}
                        name="title"
                        onChange={this.onChange}
                        value={ this.state.title }
                        placeholder={'Название статьи'}
                    />
                </label>

                <div className="groupWrapper">
                    <label>
                        Статья
                        <TinyMCE
                            name="body"
                            content={this.state.body}
                            config={{
                                plugins: 'link image code',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </label>
                </div>

                <button>Добавить</button>
            </form>
        );
    }
}

ArticleAddForm.propTypes = {
    rubrics: PropTypes.array.isRequired
};

export default ArticleAddForm;

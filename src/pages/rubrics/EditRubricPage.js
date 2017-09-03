import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindAll} from 'lodash';

import {isEmpty} from 'lodash';
import {FormGroup, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import {getRubric, editRubric, getRubricsList, skipError} from './actions';
import {LoginPage} from '../auth';

class EditRubricPage extends React.Component {
    static path = '/rubrics/edit';

    constructor(props) {
        super(props);
        bindAll(this, ['formSubmit', 'onChange']);
        this.state = {
            id: '',
            name: '',
            slug: '',
            modalShow: false
        };
    }

    componentWillMount() {
        const {match, history, auth} = this.props;

        if (!auth.isAuth) {
            history.push(LoginPage.path);
        }

        this.props.dispatch(getRubric(match.params.slug, history)).then( () => {
            this.setState({
                id: this.props.rubrics.rubric.id,
                name: this.props.rubrics.rubric.name,
                slug: this.props.rubrics.rubric.slug
            });
        });
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.props.dispatch(skipError(name));
    }

    formSubmit(e) {
        e.preventDefault();
        const {id, name, slug} = this.state;
        this.props.dispatch(editRubric({id, name, slug})).then(() => {
            if (isEmpty(this.props.rubrics.errors)) {
                this.props.dispatch(getRubricsList(this.props.history));
            }
        });
    }

    getValidationState(name) {
        const error = this.props.rubrics.errors[name];
        return error ? 'error' : null;
    }

    render() {
        return (
            <section id="EditRubricPage">
                <h2 className="title">Редактировать рубрику</h2>

                <form onSubmit={this.formSubmit}>
                    <FormGroup validationState={this.getValidationState('name')}>
                        <ControlLabel>
                            Название
                            <FormControl
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Введите название"
                                onChange={this.onChange}
                            />
                            <HelpBlock>{this.props.rubrics.errors.name}</HelpBlock>
                        </ControlLabel>
                    </FormGroup>

                    <FormGroup validationState={this.getValidationState('slug')}>
                        <ControlLabel>
                            Slug
                            <FormControl
                                type="text"
                                name="slug"
                                value={this.state.slug}
                                placeholder="Введите slug"
                                onChange={this.onChange}
                            />
                            <HelpBlock>{this.props.rubrics.errors.slug}</HelpBlock>
                        </ControlLabel>
                    </FormGroup>

                    <Button bsStyle="primary" type={'submit'}>Добавить</Button>
                </form>
            </section>
        );
    }
}

EditRubricPage.propTypes = {
    auth: PropTypes.object.isRequired,
    rubrics: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(EditRubricPage);

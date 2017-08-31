import React from 'react';
import {bindAll} from 'lodash';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {addRubric, getRubricsList} from './actions';

class AddRubricPage extends React.Component {
    static path = '/rubrics/add';

    constructor(props) {
        super(props);
        bindAll(this, ['formSubmit', 'onChange', 'getValidationState']);
        this.state = {
            name: '',
            slug: ''
        };
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    formSubmit(e) {
        e.preventDefault();
        const {name, slug} = this.state;
        this.props.dispatch(addRubric({name, slug}, this.props.history)).then(()=>{
            this.props.dispatch(getRubricsList(this.props.history));
            this.setState({
                name: '',
                slug: ''
            });
        });
    }

    getValidationState(name) {
        const error = this.props.rubrics.errors[name];
        return error ? 'error' : null;
    }

    render() {
        return (
            <section id="AddRubricPage">
                <h2 className="title">
                    Добавить рубрику
                </h2>
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
                            Название
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

AddRubricPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    rubrics: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(AddRubricPage);

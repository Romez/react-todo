import React from 'react';
import {connect} from 'react-redux';
import {bindAll} from 'lodash';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, Button, HelpBlock, Modal} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import RubricsPage from './RubricsPage';
import {getRubric, editRubric, getRubricsList, skipError} from './actions';

class EditRubricPage extends React.Component {
    static path = '/rubrics/edit';

    constructor(props) {
        super(props);
        bindAll(this, ['editRubric', 'closeModal', 'formSubmit', 'onChange']);
        this.state = {
            id: '',
            name: '',
            slug: '',
            modalShow: false
        };
    }

    closeModal() {
        this.setState({
            modalShow: false
        });
    }

    editRubric(e) {
        e.preventDefault();
        const {slug} = e.target.dataset;
        this.props.dispatch(getRubric(slug, this.props.history)).then(() => {
            this.setState({
                modalShow: true,
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
                this.props.dispatch(getRubricsList(this.props.history)).then(() => {
                    this.setState({
                        modalShow: false
                    });
                });
            }
        });
    }

    getValidationState(name) {
        const error = this.props.rubrics.errors[name];
        return error ? 'error' : null;
    }

    render() {
        const {rubrics, rubric} = this.props.rubrics;
        return (
            <section id="EditRubricPage">
                <h2 className="title">Редактировать рубрику</h2>

                <ul>
                    {rubrics.map( (item, i) => (
                        <li key={i}>
                            <Link
                                to={`${RubricsPage.path}/edit/${item.slug}`}
                                onClick={this.editRubric}
                                data-slug={item.slug}
                            >
                                {item.name} <FontAwesome name="pencil"/>
                            </Link>
                        </li>
                    ) )}
                </ul>

                <Modal show={this.state.modalShow} bsSize="small" aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton onHide={this.closeModal}>
                        <Modal.Title id="contained-modal-title-sm">Редактировать рубрику {rubric.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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

                    </Modal.Body>
                </Modal>

            </section>
        );
    }
}

EditRubricPage.propTypes = {
    rubrics: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(EditRubricPage);

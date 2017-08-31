import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindAll} from 'lodash';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import {deleteRubric, getRubricsList} from './actions';

class DeleteRubricPage extends React.Component {
    static path = '/rubrics/delete';

    constructor(props) {
        super(props);
        bindAll(this, ['deleteRubric']);
    }

    deleteRubric(e) {
        e.preventDefault();
        const {slug} = e.target.dataset;
        if (slug) {
            this.props.dispatch(deleteRubric(slug)).then(() => {
                this.props.dispatch(getRubricsList(this.props.history));
            });
        }
    }

    render() {
        const {rubrics} = this.props.rubrics;
        return (
            <section id="DeleteRubricPage">
                <h2 className="title">Удалить рубрику</h2>
                <ul className="rubricsList">
                    {rubrics.map( (item, i) => (
                        <li
                            key={i}
                            className="item"
                        >
                            <Link
                                onClick={this.deleteRubric}
                                to={`${DeleteRubricPage.path}/${item.slug}`}
                                data-slug={item.slug}
                            >
                                {item.name} <FontAwesome name="trash"/>
                            </Link>
                        </li>
                    ) )}
                </ul>
            </section>
        );
    }
}

DeleteRubricPage.propTypes = {
    rubrics: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(DeleteRubricPage);

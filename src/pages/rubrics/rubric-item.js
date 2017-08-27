import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getRubric} from './actions';

class RubricItemPage extends React.Component {
    static path = '/rubrics/:slug';

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {slug} = this.props.match.params;
        this.props.dispatch(getRubric(slug));
    }

    render() {
        const {rubric} = this.props.rubrics;
        return (
            <div>
                <h1>Рубрика {rubric.name}</h1>
            </div>
        );
    }
}

RubricItemPage.propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    rubrics: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(RubricItemPage);

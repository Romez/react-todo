import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Auth} from '../../utils';


class LogoutPage extends React.Component {
    static path = '/logout';

    constructor(props) {
        super(props);

        const history = this.props.history;
        console.log( history );
    }
}

LogoutPage.propTypes = {
    history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(LogoutPage);

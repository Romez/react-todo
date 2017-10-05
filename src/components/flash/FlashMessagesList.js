import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteFlashMessage } from './actions';
import FlashMessage from './FlashMessage';

class FlashMessagesList extends React.Component {
    render() {
        const messages = this.props.flashMessages.messages.map(message =>
            <FlashMessage
                key={message.id}
                message
                deleteFlashMessage={this.props.deleteFlashMessage}
            />
        );
        return (
            <div>{messages}</div>
        );
    }
}

FlashMessagesList.propTypes = {
    flashMessages: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        flashMessages: state.flashMessages
    };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);

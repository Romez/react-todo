import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        const { value } = e.target;
        this.props.onChange(value);
    }

    render() {
        const inputClasses = classnames({
            'error': this.props.error
        });

        return (
            <div className={this.props.divClasses}>
                <input
                    className={inputClasses}
                    type="text"
                    value={this.props.value}
                    onChange={ this.handleChange.bind(this) }
                />
                { this.props.error ? <span className="helpBlock">{this.props.error}</span> : null }
            </div>
        );
    }
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    divClasses: PropTypes.string,
    error: PropTypes.string
};

export default Input;

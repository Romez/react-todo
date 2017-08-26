import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.props.onChange(name, value);
    }

    render() {
        const inputClasses = classnames({
            'error': this.props.error
        });

        return (
            <div className={this.props.divClasses}>
                <input
                    className={inputClasses}
                    type={this.props.type}
                    value={this.props.value}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={ this.handleChange.bind(this) }
                />
                { this.props.error ? <span className="helpBlock">{this.props.error}</span> : null }
            </div>
        );
    }
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    divClasses: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string
};

Input.defaultProps = {
    type: 'text'
};

export default Input;

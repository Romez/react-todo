import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';

class Input extends React.Component {
    handleChange(e) {
        this.props.onChange(e);
    }

    render() {
        const inputClasses = classnames({
            'error': Boolean(this.props.error)
        });

        const {error} = this.props;
        const tooltipOpen = Boolean(error);

        return (
            <div className={this.props.divClasses}>
                <Tooltip
                    useContext={true}
                    arrow={true}
                    html={(
                        <div>{error}</div>
                    )}
                    position="right"
                    open={tooltipOpen}
                >
                    <input
                        className={inputClasses}
                        type={this.props.type}
                        value={this.props.value}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={ this.handleChange.bind(this) }
                    />
                </Tooltip>
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    divClasses: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string
};

Input.defaultProps = {
    type: 'text'
};

export default Input;

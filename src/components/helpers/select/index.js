import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    renderItem(item, i) {
        return (
            <option key={i} value={item.key}>{item.value}</option>
        );
    }

    changeHandler(e) {
        console.log( e.target.value );
    }

    render() {
        const {items, name} = this.props;

        return (
            <div>
                <div className={this.props.divClasses}>
                    <select
                        onChange={this.changeHandler.bind(this)}
                        name={name}
                    >
                        {items.map(this.renderItem.bind(this))}
                    </select>
                </div>
            </div>
        );
    }
}

Select.propTypes = {
    items: PropTypes.array.isRequired,
    name: PropTypes.string,
    divClasses: PropTypes.string
};


export default Select;

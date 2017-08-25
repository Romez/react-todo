import React from 'react';
import PropTypes from 'prop-types';
import {Header} from './components';
import {DevTools} from './utils';
import 'reset-css';

export default class App extends React.Component {
    static path = '';
    render() {
        return (
            <main>
                <Header />
                { this.props.children }
                { NODE_ENV === 'development' ? <DevTools/> : null }
            </main>
        );
    }
}

App.propTypes = {
    children: PropTypes.any.isRequired
};

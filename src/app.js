import React from 'react';
import PropTypes from 'prop-types';
import {Header, Footer} from './components';
import {DevTools} from './utils';
import 'reset-css';
import './less/main';

export default class App extends React.Component {
    static path = '';
    render() {
        return (
            <div className="mainWrapper">
                <Header />
                <main>
                    { this.props.children }
                </main>
                <Footer />
                { NODE_ENV === 'development' ? <DevTools/> : null }
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.any.isRequired
};

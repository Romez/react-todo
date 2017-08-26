import React from 'react';
import PropTypes from 'prop-types';
import {Header, Footer, Sidebar} from './components';
import {DevTools} from './utils';
import 'reset-css';
import './less/main';

export default class App extends React.Component {
    static path = '';
    render() {
        return (
            <div className="mainWrapper">
                <Header/>
                <main id="main">
                    <div className="wrapper">
                        <aside id="sidebar">
                            <Sidebar/>
                        </aside>
                        <section id="mainSection">
                            { this.props.children }
                        </section>
                    </div>
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

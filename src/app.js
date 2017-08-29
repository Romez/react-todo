import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Header, Footer, Sidebar} from './components';
import {DevTools} from './utils';

import {logout} from './pages/auth/actions';

import 'reset-css';
import './less/main.less';

class App extends React.Component {
    render() {
        return (
            <div className="mainWrapper">
                <Header
                    location={this.props.location}
                    logout={this.props.logout}
                    auth={this.props.auth}
                />
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
    children: PropTypes.any.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps, {logout})(App));

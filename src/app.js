import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Row, Grid, Col} from 'react-bootstrap';
import {Header, Footer, Sidebar} from './components';
import {DevTools} from './utils';
import {logout} from './pages/auth/actions';

import 'reset-css';
import './less/main.less';

class App extends React.Component {
    render() {
        return (
            <Grid className="container-fluid">

                <Row>
                    <Header
                        location={this.props.location}
                        logout={this.props.logout}
                        auth={this.props.auth}
                    />
                </Row>

                <Row>
                    <main id="main">
                        <Col xsHidden xs={12} sm={2} id="sidebar">
                            <Sidebar
                                location={this.props.location}
                                auth={this.props.auth}
                            />
                        </Col>
                        <Col xs={12} sm={10} id="mainSection">

                            { this.props.children }
                        </Col>
                    </main>
                </Row>

                <Row>
                    <Footer />
                </Row>

                { NODE_ENV === 'development' ? <DevTools/> : null }
            </Grid>
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

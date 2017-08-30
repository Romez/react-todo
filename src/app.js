import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Row, Grid, Col} from 'react-bootstrap';
import {Header, Footer, Sidebar} from './components';
import {DevTools} from './utils';

import 'reset-css';
import './less/main.less';

class App extends React.Component {
    render() {
        return (
            <Grid bsClass="container-fluid">
                <Row>
                    <Header/>
                </Row>

                <Grid bsClass="container">
                    <Row>
                        <main id="main">
                            <Col xsHidden xs={12} sm={2} id="sidebar">
                                <Sidebar/>
                            </Col>
                            <Col xs={12} sm={10} id="mainSection">
                                { this.props.children }
                            </Col>
                        </main>
                    </Row>
                </Grid>


                <Row>
                    <Footer />
                </Row>

                { NODE_ENV === 'development' ? <DevTools/> : null }
            </Grid>
        );
    }
}

App.propTypes = {
    children: PropTypes.any.isRequired
};

export default withRouter(connect(null)(App));

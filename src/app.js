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
                <main id="main">
                    <Row>
                        <Header/>
                    </Row>

                    <Grid bsClass="container content">
                        <Row>
                            <section>
                                <Col xsHidden xs={12} sm={3} md={3} id="sidebar">
                                    <Sidebar/>
                                </Col>
                                <Col xs={12} sm={9} md={9} id="mainSection">
                                    { this.props.children }
                                </Col>
                            </section>
                        </Row>
                    </Grid>

                    <Row>
                        <Footer />
                    </Row>
                </main>
                { NODE_ENV === 'development' ? <DevTools/> : null }
            </Grid>
        );
    }
}

App.propTypes = {
    children: PropTypes.any.isRequired
};

export default App;

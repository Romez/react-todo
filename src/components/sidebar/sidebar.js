import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {RubricsPage, SidebarRubrics} from '../../pages/rubrics';
import {connect} from 'react-redux';

import {AdminPage} from '../../pages/admin';

import './styles.less';

class Sidebar extends React.Component {
    render() {
        const { isAuth } = this.props.auth;
        return (
            <div id="sidebar">
                <div className="rubrics">
                    {<Link className="title" to={RubricsPage.path}>Рубрики</Link> }
                    <SidebarRubrics/>
                </div>

                {isAuth ?
                    <div className="admin">
                        <Link className="title" to={AdminPage.path}>Настройки</Link>
                        <AdminPage/>
                    </div>
                    : null}

            </div>
        );
    }
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        sidebar: state.sidebar,
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));

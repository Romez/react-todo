import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SidebarRubrics } from '../../pages/rubrics';
import { SettingsSidebar } from '../../pages/settings';

import './styles.less';

class Sidebar extends React.Component {
    render() {
        const { isAuth } = this.props.auth;
        return (
            <div>
                <SidebarRubrics />
                {isAuth && <SettingsSidebar />}
            </div>
        );
    }
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));

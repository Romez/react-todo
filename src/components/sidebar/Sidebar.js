import React from 'react';
import PropTypes from 'prop-types';
import { SidebarRubrics } from '../../pages/rubrics';
import { SettingsSidebar } from '../../pages/settings';

import './styles.less';

class Sidebar extends React.Component {
    render() {
        const { isAuth } = this.props.auth;
        return (
            <div>
                <SidebarRubrics
                    location={this.props.location}
                />
                {isAuth && <SettingsSidebar location={this.props.location}/>}
            </div>
        );
    }
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default Sidebar;

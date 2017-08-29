import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {RubricsPage, SidebarRubrics} from '../../pages/rubrics';
import {SettingsSidebar} from '../../pages/settings';
import {connect} from 'react-redux';

import './styles.less';

class Sidebar extends React.Component {
    render() {
        const { isAuth } = this.props.auth;
        return (
            <div>
                <div className="rubrics">
                    {<Link className="title" to={RubricsPage.path}>Рубрики</Link> }
                    <SidebarRubrics/>
                </div>

                {isAuth ? <SettingsSidebar location={this.props.location}/> : null}
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

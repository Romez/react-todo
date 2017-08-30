import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classname from 'classnames';
import {ArticleAddPage} from './article';
import SettingsPage from './SettingsPage';

class SettingsSidebar extends React.Component {
    render() {
        const itemClasses = classname('item', {
            active: ArticleAddPage.path === this.props.location.pathname
        });

        return (
            <div id="settingsSidebar">
                <Link className="title" to={SettingsPage.path}>Настройки</Link>
                <div className={itemClasses}>
                    <Link to={ArticleAddPage.path}>Добавить статью</Link>
                </div>
            </div>
        );
    }
}

SettingsSidebar.propTypes = {
    location: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {};
}
export default withRouter(connect(mapStateToProps)(SettingsSidebar));

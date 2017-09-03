import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classname from 'classnames';

import SettingsPage from './SettingsPage';
import RubricsListPage from './RubricsListPage';
import ArticlesListPage from './ArticlesListPage';

class SettingsSidebar extends React.Component {
    render() {
        return (
            <div id="settingsSidebar">
                <Link className="title" to={SettingsPage.path}>Настройки</Link>

                <div className={classname('item', {active: RubricsListPage.path === this.props.location.pathname})}>
                    <Link to={RubricsListPage.path}>Рубрики</Link>
                </div>

                <div className={classname('item', {active: ArticlesListPage.path === this.props.location.pathname})}>
                    <Link to={ArticlesListPage.path}>Статьи</Link>
                </div>

            </div>
        );
    }
}

SettingsSidebar.propTypes = {
    location: PropTypes.object.isRequired
};

export default SettingsSidebar;

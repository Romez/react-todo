import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classname from 'classnames';
import {ArticleAddPage} from './article';
import SettingsPage from './SettingsPage';
import {AddRubricPage, DeleteRubricPage} from '../rubrics';

class SettingsSidebar extends React.Component {
    render() {
        const itemClasses = classname('item', {
            active: ArticleAddPage.path === this.props.location.pathname
        });

        return (
            <div id="settingsSidebar">
                <Link className="title" to={SettingsPage.path}>Настройки</Link>
                <div className={itemClasses}>
                    <Link to={AddRubricPage.path}>Добавить рубрику</Link>
                </div>

                <div className={itemClasses}>
                    <Link to={DeleteRubricPage.path}>Удалить рубрику</Link>
                </div>

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

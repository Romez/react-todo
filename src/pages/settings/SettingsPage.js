import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './styles.less';

import {LoginPage} from '../auth';
import RubricsListPage from './RubricsListPage';
import ArticlesListPage from './ArticlesListPage';


class SettingsPage extends React.Component {
    static path = '/settings';

    componentWillMount() {
        if (!this.props.auth.isAuth) {
            this.props.history.push(LoginPage.path);
        }
    }

    render() {
        return (
            <section id="settingsPage">
                <h2 className="title">
                    Настройки
                </h2>

                <ul>
                    <li>
                        <Link to={RubricsListPage.path}>
                            Рубрики
                        </Link>
                    </li>
                    <li>
                        <Link to={ArticlesListPage.path}>
                            Статьи
                        </Link>
                    </li>
                </ul>
            </section>
        );
    }
}

SettingsPage.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {auth: state.auth};
}

export default connect(mapStateToProps)(SettingsPage);

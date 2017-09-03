import React from 'react';
import {Link} from 'react-router-dom';

import './styles.less';
import RubricsListPage from './RubricsListPage';
import ArticlesListPage from './ArticlesListPage';

class SettingsPage extends React.Component {
    static path = '/settings';

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

export default SettingsPage;

import React from 'react';
import {Link} from 'react-router-dom';
import {ArticleAddPage} from './article';
import './styles.less';

class SettingsPage extends React.Component {
    static path = '/settings';

    render() {
        return (
            <section id="settingsPage">
                <h2 className="title">
                    Настройки
                </h2>
                <Link to={ArticleAddPage.path}>Добавить статью</Link>
            </section>
        );
    }
}

export default SettingsPage;

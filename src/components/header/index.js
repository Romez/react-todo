import React from 'react';
import {Link} from 'react-router-dom';
import './styles.less';
import classnames from 'classnames';

import {HomePage} from '../../pages/home';
import {ContactsPage} from '../../pages/contacts';
import {TodoPage} from '../../pages/todo';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="menu">
                    <div className={ classnames('menu__item', {'active': location.pathname === HomePage.path}) }>
                        {<Link to={HomePage.path}>Главная</Link>}
                    </div>
                    <div className={ classnames('menu__item', {'active': location.pathname === TodoPage.path}) }>
                        {<Link to={TodoPage.path}>Список дел</Link>}
                    </div>
                    <div className={ classnames('menu__item', {'active': location.pathname === ContactsPage.path}) }>
                        {<Link to={ContactsPage.path}>Контакты</Link>}
                    </div>
                </nav>
            </header>
        );
    }
}

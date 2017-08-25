import React from 'react';
import {Link} from 'react-router-dom';
import './styles.less';

import {HomePage} from '../../pages/home';
import {ContactsPage} from '../../pages/contacts';

export default class Header extends React.Component {
    render() {
        return (
            <div className="menu">
                <div className="menu__item">
                    {<Link to={HomePage.path}>Главная</Link>}
                </div>
                <div className="menu__item">
                    {<Link to={ContactsPage.path}>Контакты</Link>}
                </div>
            </div>
        );
    }
}

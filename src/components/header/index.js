import React from 'react';
import {PropTypes} from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import classnames from 'classnames';
import {connect} from 'react-redux';

import {HomePage} from '../../pages/home';
import {ContactsPage} from '../../pages/contacts';
import {TodoPage} from '../../pages/todo';

import {LoginPage} from '../../pages';

import {logout} from '../../pages/auth/actions';

import './styles.less';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const {pathname} = this.props.location;
        const { isAuth } = this.props.auth;
        const userLinks = (
            <div className={ classnames('menu__item') }>
                {<a href="#" onClick={this.logout.bind(this)}>Выйти</a>}
            </div>
        );
        const guestLinks = (
            <div className={ classnames('menu__item', {'active': pathname === LoginPage.path}) }>
                {<Link to={LoginPage.path}>Войти</Link>}
            </div>
        );

        const todoLink = (
            <div className={ classnames('menu__item', {'active': pathname === TodoPage.path}) }>
                {<Link to={TodoPage.path}>Список дел</Link>}
            </div>
        );

        return (
            <header>
                <nav className="menu">
                    <div className={ classnames('menu__item', {'active': pathname === HomePage.path}) }>
                        {<Link to={HomePage.path}>Главная</Link>}
                    </div>
                    { isAuth ? todoLink : null }
                    <div className={ classnames('menu__item', {'active': pathname === ContactsPage.path}) }>
                        {<Link to={ContactsPage.path}>Контакты</Link>}
                    </div>
                    {isAuth ? userLinks : guestLinks}
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps, {logout})(Header));

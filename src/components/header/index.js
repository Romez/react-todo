import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { LoginPage, TodoPage, ContactsPage, HomePage, ArticleAddPage } from '../../pages';

class Header extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuth, user } = this.props.auth;

        const userLinks = (
            <NavItem
                href="#"
                onClick={this.logout.bind(this)}
            >Выйти ({user.username})</NavItem>
        );
        const guestLinks = (
            <LinkContainer to={ LoginPage.path }>
                <NavItem>Войти</NavItem>
            </LinkContainer>
        );
        const todoLink = (
            <LinkContainer to={ TodoPage.path }>
                <NavItem>
                    Список дел
                </NavItem>
            </LinkContainer>
        );
        const settingsLink = (
            <NavDropdown className="hidden-lg hidden-md hidden-sm" title="Настройки" id="settingsDropdown">
                <LinkContainer exact={true} to={ ArticleAddPage.path }>
                    <NavItem>
                        Добавить статью
                    </NavItem>
                </LinkContainer>
            </NavDropdown>
        );


        return (
            <header id="header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {<Link to={HomePage.path}>&#60;UshakovRS/&#62;</Link>}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer exact={true} to={ HomePage.path }>
                                <NavItem>
                                    Главная
                                </NavItem>
                            </LinkContainer>

                            {isAuth && todoLink}

                            <LinkContainer to={ ContactsPage.path }>
                                <NavItem >
                                    Контакты
                                </NavItem>
                            </LinkContainer>

                            {isAuth && settingsLink}

                            {isAuth ? userLinks : guestLinks}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Header;

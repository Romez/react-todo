import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { LoginPage, ContactsPage, HomePage, ArticleAddPage, RubricsPage } from '../../pages';
import {logout} from '../../pages/auth/actions';
import {getRubric, getRubricArticles} from '../../pages/rubrics/actions';
import {store} from '../../index';

class Header extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    changeRubric(e) {
        const {slug} = e.target.dataset;
        store.dispatch(getRubric(slug));
        store.dispatch(getRubricArticles(slug));
    }

    render() {
        const { isAuth, user } = this.props.auth;
        const { rubrics } = this.props.rubrics;

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
                <Navbar inverse collapseOnSelect staticTop>
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

                            <NavDropdown className="hidden-lg hidden-md hidden-sm" title="Рубрики" id="rubricsDropdown">
                                {rubrics.map( (item, i) => (
                                    <LinkContainer
                                        key={i}
                                        to={`${RubricsPage.path}/${item.slug}`}
                                        onClick={this.changeRubric.bind(this)}
                                        data-slug={item.slug}
                                    >
                                        <NavItem>
                                            {item.name}
                                        </NavItem>
                                    </LinkContainer>
                                ))}

                            </NavDropdown>

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
    location: PropTypes.object.isRequired,
    rubrics: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        rubrics: state.rubrics
    };
}

export default withRouter(connect(mapStateToProps, {logout, getRubric, getRubricArticles})(Header));

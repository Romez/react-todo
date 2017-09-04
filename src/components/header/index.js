import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {bindAll} from 'lodash';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import {store} from '../../index';

import {LoginPage, ContactsPage, HomePage, RubricsPage} from '../../pages';
import {logout} from '../../pages/auth/actions';
import {getRubric, getRubricArticles} from '../../pages/rubrics/actions';
import {RubricsListPage, ArticlesListPage} from '../../pages/settings';


class Header extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ['logout', 'changeRubric', 'renderRubrics']);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    changeRubric(e) {
        const {slug} = e.target.dataset;
        store.dispatch(getRubric(slug));
        store.dispatch(getRubricArticles(slug));
    }

    renderRubrics(item, i) {
        return (
            <LinkContainer
                key={i}
                to={`${RubricsPage.path}/${item.slug}`}
                onClick={this.changeRubric}
                data-slug={item.slug}
            >
                <NavItem>
                    {item.name}
                </NavItem>
            </LinkContainer>
        );
    }

    render() {
        const { isAuth, user } = this.props.auth;
        const { rubrics } = this.props.rubrics;
        const userLinks = (
            <NavItem
                href="#"
                onClick={this.logout}
            >Выйти ({user.username})</NavItem>
        );
        const guestLinks = (
            <LinkContainer to={ LoginPage.path }>
                <NavItem>Войти</NavItem>
            </LinkContainer>
        );
        const settingsLink = (
            <NavDropdown className="hidden-lg hidden-md hidden-sm" title="Настройки" id="settingsDropdown">
                <LinkContainer to={RubricsListPage.path}>
                    <NavItem>Рубрики</NavItem>
                </LinkContainer>

                <LinkContainer to={ArticlesListPage.path}>
                    <NavItem>Статьи</NavItem>
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
                                <NavItem>Главная</NavItem>
                            </LinkContainer>

                            <NavDropdown className="hidden-lg hidden-md hidden-sm" title="Рубрики" id="rubricsDropdown">
                                {rubrics.map(this.renderRubrics)}
                            </NavDropdown>

                            <LinkContainer to={ ContactsPage.path }>
                                <NavItem>Контакты</NavItem>
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

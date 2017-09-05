import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Jumbotron, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {LoginPage} from '../auth';
import './styles.less';

class HomePage extends React.Component {
    static path = '/';

    render() {
        const {auth} = this.props;
        return (
            <section id="HomePage">
                <Jumbotron>
                    <h1>Приветствую</h1>
                    <p>Перед Вами простое single page application. Это блог с админ-панелью. Здесь можно добавлять,
                        редактировать и удалять рубрики и статьи. </p>
                    <p>Авторизация происходит по token. Приложение использует REST для связи с сервером.</p>

                    <p>Код можно посмотреть здесь:</p>

                    <ul>
                        <li>
                            <a target="_block" href="https://github.com/Romez/react-tasks.git">Frontend</a>
                        </li>
                        <li>
                            <a target="_block" href="https://github.com/Romez/tasks.server.git">Backend</a>
                        </li>
                    </ul>

                    {!auth.isAuth && <LinkContainer to={LoginPage.path}>
                        <p>
                            <div>Логин: admin Пароль: admin</div>
                            <Button bsStyle="primary">Войти</Button>
                        </p>
                    </LinkContainer>}

                </Jumbotron>
            </section>
        );
    }
}

HomePage.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(HomePage);

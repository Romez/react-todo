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

        console.log( auth.isAuth );

        return (
            <section id="HomePage">
                <Jumbotron>
                    <h1>Приветствую</h1>
                    <p>Перед Вами простое single page application. Это блог с админ-панелью. Здесь можно добавлять,
                        редактировать и удалять рубрики и статьи. </p>
                    <p>Авторизация происходит по token. Приложение использует REST для связи с сервером.</p>

                    <p>Код можно посмотреть здесь:
                        <p><a href="https://github.com/Romez/react-tasks.git">Frontend</a></p>
                        <p><a href="https://github.com/Romez/tasks.server.git">Backend</a></p>
                    </p>

                    <p>
                        {!auth.isAuth && <LinkContainer to={LoginPage.path}>
                            <Button bsStyle="primary">Войти</Button>
                        </LinkContainer>
                        }
                    </p>
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

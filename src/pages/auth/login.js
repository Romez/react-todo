import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Input} from '../../components';
import {login} from './actions';
import './login.less';

class LoginPage extends React.Component {
    static path = '/login';

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    inputChange(name, value) {
        this.setState({ [name]: value });
    }

    login(e) {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.dispatch( login(username, password, this.props.history) );
        this.props.history.goBack();
    }

    render() {
        return (
            <div id="loginPage">
                <form onSubmit={ this.login.bind(this)}>
                    <Input
                        value={this.state.username}
                        name={'username'}
                        onChange={this.inputChange.bind(this)}
                        placeholder={'Логин'}
                    />
                    <Input
                        value={this.state.password}
                        onChange={this.inputChange.bind(this)}
                        name={'password'}
                        placeholder={'Пароль'}
                        type={'password'}
                    />
                    <button>Войти</button>
                </form>
            </div>
        );
    }
}

LoginPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(LoginPage);

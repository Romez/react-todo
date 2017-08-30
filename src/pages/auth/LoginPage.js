import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
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

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login(e) {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.dispatch( login(username, password, this.props.history) );
        this.props.history.push('/');
    }

    render() {
        return (
            <div id="loginPage">
                <form onSubmit={ this.login.bind(this)}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder="Enter text"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormControl
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Введите пароль"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <Button type={'summit'} bsStyle="primary" onClick={this.login.bind(this)}>
                        Войти
                    </Button>
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

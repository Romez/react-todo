import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import {login} from './actions';
import {addFlashMessage} from '../../components/flash/actions';
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
        this.login = this.login.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login(e) {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.dispatch(login(username, password, this.props.history)).then(()=>{
            this.props.dispatch(addFlashMessage({
                type: 'success',
                text: 'Вы успешно вошли'
            }));
        });
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

                    <Button type="submit" bsStyle="primary" onClick={this.login}>
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

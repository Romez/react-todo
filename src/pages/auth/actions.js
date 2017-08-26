export const LOGIN = 'LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
import axios from 'axios';
import LS from '../../utils/localstorage';
import {setAuthToken} from '../../utils';
import jwt from 'jsonwebtoken';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function login(username, password, history) {
    let error = '';
    if (username === '') {
        error = 'Заполните все поля';
    }
    if (password === '') {
        error = 'Заполните все поля';
    }

    if (error) {
        return {
            type: LOGIN,
            error
        };
    }

    return dispatch => {
        return axios.post('http://localhost:9088/users/auth', {username, password}).then(res => {
            const token = res.data.token;
            LS.set('token', token);
            setAuthToken(token);
            dispatch(setCurrentUser(( jwt.decode(token) )));
        });
    };

    // return (dispatch) => {
    //     Axios.post('http://localhost:9088/users/auth', {
    //         username, password
    //     })
    //         .then(res => {
    //             const token = res.data.token;
    //             const user = res.data.username;
    //
    //             LS.set('auth', {token, username: user});
    //
    //             dispatch({
    //                 type: LOGIN,
    //                 error, token, username: user
    //             });
    //
    //             history.push('/todo');
    //         })
    //         .catch((er) => {
    //             error = 'Неверные имя пользовател или пароль';
    //             dispatch({
    //                 type: LOGIN,
    //                 error
    //             });
    //         });
    // };
}

export function logout() {
    return dispatch => {
        LS.remove('token');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    };
}

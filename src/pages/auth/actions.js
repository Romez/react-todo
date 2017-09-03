import axios from 'axios';
import jwt from 'jsonwebtoken';

import LS from '../../utils/localstorage';
import {setAuthToken} from '../../utils';
import config from '../../config';

const LOGIN = 'LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

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
        return axios.post(`${config.serverUrl}/users/auth`, {username, password}).then(res => {
            const token = res.data.token;
            LS.set('token', token);
            setAuthToken(token);
            dispatch(setCurrentUser(( jwt.decode(token) )));
        });
    };
}

export function logout() {
    return dispatch => {
        LS.remove('token');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    };
}

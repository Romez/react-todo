import {LOGIN, SET_CURRENT_USER} from './actions';
import {isEmpty} from 'lodash';

const initialState = {
    isAuth: false,
    user: {},
    error: ''
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuth: !isEmpty(action.user),
                user: action.user
            }
        case LOGIN:
            return Object.assign({}, state, {
                error: action.error,
                username: action.username,
                token: action.token
            });
        default:
            return state;
    }
}

const AuthReducer = {
    auth: authReducer
};

export default AuthReducer;

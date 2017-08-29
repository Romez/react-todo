/* eslint-disable camelcase */
import Axios from 'axios';
import {LoginPage} from '../auth';

export const ADD_ARTICLE = 'ADD_ARTICLE';

export function addArticle(title, body, created_at) {
    return dispatch => {
        return Axios.post('http://localhost:9088/articles/add', {
            title, body, created_at
        }).then(res => {
            dispatch({
                type: ADD_ARTICLE,
                success: res.data.success
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}



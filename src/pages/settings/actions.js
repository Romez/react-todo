/* eslint-disable camelcase */
import Axios from 'axios';
import {LoginPage} from '../auth';
import {ArticlePage} from '../articles';

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const SKIP_ERROR = 'SKIP_ERROR';

export function addArticle(rubric, body, title, created_at, imagePreviewUrl, history) {
    return dispatch => {
        return Axios.post('http://localhost:9088/articles/add', {
            rubric, title, body, created_at, imagePreviewUrl
        }).then(res => {
            history.push(`${ArticlePage.path}/${res.data.article.insertId}`);
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
            if ( error.response.status === 400 ) {
                dispatch({
                    type: ADD_ARTICLE,
                    errors: error.response.data.errors
                });
            }
        });
    };
}

export function skipErrors(name) {
    return dispatch => {
        dispatch({
            type: SKIP_ERROR,
            name
        });
    };
}



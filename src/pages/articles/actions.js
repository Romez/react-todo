import Axios from 'axios';
import ArticlePage from './ArticlePage';
import {LoginPage} from '../auth';

export const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export function getAllArticles(history) {
    return dispatch => {
        return Axios.get('http://localhost:9088/articles').then(res => {
            dispatch({
                type: GET_ALL_ARTICLES,
                articles: res.data.articles
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}

export function getArticle(id) {
    return dispatch => {
        return Axios.get(`http://localhost:9088/article/${id}`).then(res => {
            dispatch({
                type: GET_ARTICLE,
                article: res.data.article
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}

export function addArticle(data, history) {
    return dispatch => {
        return Axios.post('http://localhost:9088/articles/add', data).then(res => {
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

export function editArticle(data, history) {
    return dispatch => {
        return Axios.post('http://localhost:9088/article/edit', data).then(res => {
            history.push(`${ArticlePage.path}/${data.id}`);
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            } else if (error.response.status === 400) {
                dispatch({
                    type: EDIT_ARTICLE,
                    errors: res.data.errors
                });
            }
        });
    };
}

export function deleteArticle(id, history) {
    return dispatch => {
        return Axios.delete(`http://localhost:9088/article/${id}`).then(res => {
            //todo flash message
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}

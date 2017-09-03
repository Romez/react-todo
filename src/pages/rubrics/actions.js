import Axios from 'axios';

export const GET_RUBRIC = 'GET_RUBRIC';
export const GET_RUBRICS_LIST = 'GET_RUBRICS_LIST';
export const GET_RUBRIC_ARTICLES = 'GET_RUBRIC_ARTICLES';
export const ADD_RUBRIC = 'ADD_RUBRIC';
export const EDIT_RUBRIC = 'EDIT_RUBRIC';
export const SKIP_ERROR = 'SKIP_ERROR';

export function getRubricsList(history) {
    return dispatch => {
        return Axios.get('http://localhost:9088/rubrics').then(res => {
            dispatch({
                type: GET_RUBRICS_LIST,
                rubrics: res.data.rubrics
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}


export function skipError(name) {
    return dispatch => {
        dispatch({
            type: SKIP_ERROR,
            name
        });
    };
}

export function addRubric(data, history) {
    return dispatch => {
        return Axios.put('http://localhost:9088/rubric/add', data).then(res => {

        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            } else if (error.response.status === 400) {
                const {errors} = error.response.data;
                dispatch({
                    type: ADD_RUBRIC,
                    errors
                });
            }
        });
    };
}

export function editRubric(data, history) {
    return dispatch => {
        return Axios.post('http://localhost:9088/rubric/edit', data).then(res => {

        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            } else if (error.response.status === 400) {
                const {errors} = error.response.data;
                dispatch({
                    type: EDIT_RUBRIC,
                    errors
                });
            }
        });
    };
}

export function deleteRubric(slug) {
    return dispatch => {
        return Axios.delete(`http://localhost:9088/rubric/${slug}`).then(res => {
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}

export function getRubric(slug, history) {
    return dispatch => {
        return Axios.get(`http://localhost:9088/rubrics/${slug}`).then(res => {
            dispatch({
                type: GET_RUBRIC,
                rubric: res.data.rubric
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}

export function getRubricArticles(slug, history) {
    return dispatch => {
        return Axios.get(`http://localhost:9088/rubric-articles/${slug}`).then(res => {
            dispatch({
                type: GET_RUBRIC_ARTICLES,
                rubricArticles: res.data.rubricArticles
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}



import Axios from 'axios';

export const GET_RUBRIC = 'GET_RUBRIC';
export const GET_RUBRICS_LIST = 'GET_RUBRICS_LIST';
export const GET_RUBRIC_ARTICLES = 'GET_RUBRIC_ARTICLES';

export function getRubric(slug) {
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

export function getRubricArticles(slug) {
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

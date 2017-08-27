import Axios from 'axios';

export const GET_RUBRIC = 'GET_RUBRIC';
export const GET_RUBRICS_LIST = 'GET_RUBRICS_LIST';

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

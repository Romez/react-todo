import {LoginPage} from '../../pages/auth';
import Axios from 'axios';

export const GET_RUBRICS_LIST = 'GET_RUBRICS_LIST';

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

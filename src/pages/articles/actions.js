import Axios from 'axios';

export const GET_ARTICLE = 'GET_ARTICLE';

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

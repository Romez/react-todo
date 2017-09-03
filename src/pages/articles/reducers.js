import {GET_ARTICLE, ADD_ARTICLE, GET_ALL_ARTICLES} from './actions';

const initialState = {
    articles: [],
    article: {},
    errors: {}
};

function articleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ARTICLES:
            return Object.assign({}, state, {
                articles: action.articles
            });

        case GET_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });
        case ADD_ARTICLE:
            return Object.assign({}, state, {
                errors: action.errors
            });

        default:
            return state;
    }
}

const ArticleReducer = {
    article: articleReducer
};

export default ArticleReducer;

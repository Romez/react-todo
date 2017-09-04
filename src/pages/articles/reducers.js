import {GET_ARTICLE, ADD_ARTICLE, GET_ALL_ARTICLES, SKIP_ERRORS} from './actions';

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
        case SKIP_ERRORS:
            let {errors} = state;

            if (action.name) {
                delete errors[action.name];
            } else {
                errors = [];
            }

            return Object.assign({}, state, {errors});
        default:
            return state;
    }
}

const ArticleReducer = {
    article: articleReducer
};

export default ArticleReducer;

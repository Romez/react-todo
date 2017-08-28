import {GET_ARTICLE} from './actions';

const initialState = {
    article: {}
};

function articleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });

        default:
            return state;
    }
}

const ArticleReducer = {
    article: articleReducer
};

export default ArticleReducer;

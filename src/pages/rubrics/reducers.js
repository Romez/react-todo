import {GET_RUBRIC, GET_RUBRICS_LIST, GET_RUBRIC_ARTICLES, ADD_RUBRIC, EDIT_RUBRIC, SKIP_ERROR} from './actions';

const initialState = {
    rubrics: [],
    rubric: {},
    rubricArticles: [],
    errors: {}
};

function rubricReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RUBRIC:
            return Object.assign({}, state, {
                rubric: action.rubric
            });
        case GET_RUBRICS_LIST:
            return Object.assign({}, state, {
                rubrics: action.rubrics
            });
        case GET_RUBRIC_ARTICLES:
            return Object.assign({}, state, {
                rubricArticles: action.rubricArticles
            });
        case ADD_RUBRIC:
            return Object.assign({}, state, {
                errors: action.errors
            });
        case EDIT_RUBRIC:
            return Object.assign({}, state, {
                errors: action.errors
            });
        case SKIP_ERROR:
            const {errors} = state;
            delete errors[action.name];
            return Object.assign({}, state, {
                errors
            });

        default:
            return state;
    }
}

const RubricReducer = {
    rubrics: rubricReducer
};

export default RubricReducer;

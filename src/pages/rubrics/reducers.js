import {GET_RUBRIC, GET_RUBRICS_LIST} from './actions';


const initialState = {
    rubrics: [],
    rubric: {},
    error: ''
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

        default:
            return state;
    }
}

const RubricReducer = {
    rubrics: rubricReducer
};

export default RubricReducer;

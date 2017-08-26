import {GET_RUBRIC} from './actions';

const initialState = {
    rubric: {},
    error: ''
};

function rubricReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RUBRIC:
            return Object.assign({}, state, {
                rubric: action.rubric
            });

        default:
            return state;
    }
}

const RubricReducer = {
    rubric: rubricReducer
};

export default RubricReducer;

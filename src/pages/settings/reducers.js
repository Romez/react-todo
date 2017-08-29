import {ADD_ARTICLE, SKIP_ERROR} from './actions';

const initialState = {
    errors: {
        title: '',
        rubric: '',
        body: ''
    }
};

function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return Object.assign({}, state, {
                errors: action.errors
            });
        case SKIP_ERROR:
            const {errors} = state;
            delete errors[action.name];
            return Object.assign({}, state, {errors});
        default:
            return state;
    }
}

const SettingsReducer = {
    settings: settingsReducer
};

export default SettingsReducer;

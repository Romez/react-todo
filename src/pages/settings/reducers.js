import {ADD_ARTICLE} from './actions';

const initialState = {};

function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return state;
        default:
            return state;
    }
}

const SettingsReducer = {
    settings: settingsReducer
};

export default SettingsReducer;

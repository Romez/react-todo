import { GET_RUBRICS_LIST } from './actions';

const initialState = {
    rubrics: [],
    error: ''
};

function sidebarReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RUBRICS_LIST:
            return Object.assign({}, state, {
                rubrics: action.rubrics
            });

        default:
            return state;
    }
}

const SidebarReducer = {
    sidebar: sidebarReducer
};

export default SidebarReducer;

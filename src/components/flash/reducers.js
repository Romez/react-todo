import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './actions';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

const initialState = {
    messages: []
};

function flashReducer(state = initialState, action) {
    const {messages} = state;
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            messages.push({
                id: shortid.generate(),
                type: action.message.type,
                text: action.message.text
            });
            return Object.assign({}, state, {
                messages
            });
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(messages, { id: action.id });
            delete messages[index];
            return Object.assign({}, state, {messages});

        default: return state;
    }
}

const FlashReducer = {
    flashMessages: flashReducer
};

export default FlashReducer;

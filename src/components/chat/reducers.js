import {
    CHAT_CONNECTING,
    CHAT_CONNECTED,
    CHAT_ADD_MESSAGE,
    CHAT_CLEAR
} from './actions';

const initialState = {
    socket: null,
    messages: []
};

function chatReducer(state = initialState, action) {
    const {messages} = state;
    switch (action.type) {
        /** Процесс соединения */
        case CHAT_CONNECTING:
            messages.push(action.msg);
            return Object.assign({}, state, {
                messages
            });

        case CHAT_CONNECTED:
            messages.push(action.msg);
            return Object.assign({}, state, {
                socket: action.socket,
                messages
            });

        case CHAT_CLEAR:
            return Object.assign({}, state, {
                messages: []
            });

        case CHAT_ADD_MESSAGE:
            messages.push(action.message);
            return Object.assign({}, state, {
                messages
            });

        default: return state;
    }
}

const ChatReducer = {
    chat: chatReducer
};

export default ChatReducer;

export const CHAT_CONNECTING = 'CHAT_CONNECTING';

export const CHAT_CONNECTED = 'CHAT_CONNECTED';
export const CHAT_CLEAR = 'CHAT_CLEAR';
export const CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE';

export function chatConnect(socket) {
    return dispatch => {
        dispatch({
            type: CHAT_CONNECTING,
            msg: 'Cоединение...'
        });

        socket.on('connect', () => {
            dispatch({
                type: CHAT_CONNECTED,
                msg: 'Соединение установлено',
                socket
            });
        });
    };
}

export function chatClear() {
    return {
        type: CHAT_CLEAR
    };
}

export function chatAddMessage(message) {
    return {
        type: CHAT_ADD_MESSAGE,
        message
    };
}

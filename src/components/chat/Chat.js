import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindAll} from 'lodash';
import io from 'socket.io-client';
import LS from '../../utils/localstorage';
import * as pageActions from './actions';
import './styles.less';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        bindAll(this, ['initChat', 'sendMsg', 'onMsgChange']);
    }

    componentDidMount() {
        const {isAuth} = this.props.auth;
        if (isAuth) {
            const token = LS.get('token');
            const socket = io.connect('http://localhost:9088', {
                'query': `token=${token}`
            });

            const {chatConnect} = pageActions;
            this.props.dispatch(chatConnect(socket));
            this.initChat(socket);
        } else {
            //TODO Войти
        }
    }

    initChat(socket) {
        const {chatClear, chatAddMessage} = pageActions;
        /** Уведомление что пользователь вошел */
        socket.on('user enter', (username) => {
            const message = `${username}: вошел в чат`;
            this.props.dispatch(chatAddMessage(message));
        });

        /** стория последних сообщений */
        socket.on('chat history', (messages) => {
            this.props.dispatch(chatClear());
            messages.map(msg => {
                const message = `${msg.username}: ${msg.mgs}`;
                this.props.dispatch(chatAddMessage(message));
            });
        });

        /** Сообщение чата */
        socket.on('chat message', msg => {
            this.props.dispatch(chatAddMessage(msg));
        });
    }

    onMsgChange(e) {
        const message = e.target.value;
        this.setState({message});
    }

    sendMsg() {
        const {socket} = this.props.chat;
        socket.emit('chat message', this.state.message);
        this.setState({message: ''});
    }

    render() {
        const {messages} = this.props.chat;
        return (
            <section id="chat">
                <h1>
                    Чат
                </h1>

                <div className="chatWindow">
                    <div className="messages">
                        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
                    </div>
                    <div className="chatControl">
                        <input
                            className="form-control"
                            onChange={this.onMsgChange}
                            type="text"
                            value={this.state.message}
                        />
                        <button onClick={this.sendMsg} className="btn fa fa-paper-plane" />
                    </div>
                </div>
            </section>
        );
    }
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        chat: state.chat,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Chat);

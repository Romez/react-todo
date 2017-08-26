export const ADD_TODO = 'ADD_TODO';
export const GET_TODO_LIST = 'GET_TODO_LIST';
import Axios from 'axios';
import {LoginPage} from '../auth';

export function addTodo(id, name) {
    let error = '';
    if (!name) {
        error = 'Заполните строку';
    }

    return {
        type: ADD_TODO,
        id, name, error
    };
}

export function getTodoList(history) {
    return dispatch => {
        return Axios.get('http://localhost:9088/tasks').then(res => {
            dispatch({
                type: GET_TODO_LIST,
                todoList: res.data.tasks
            });
        }).catch(error => {
            if (error.response.status === 403) {
                history.push(LoginPage.path);
            }
        });
    };
}

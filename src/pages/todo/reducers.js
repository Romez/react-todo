import {ADD_TODO, GET_TODO_LIST} from './actions';

const initialState = {
    todoList: [
        // {
        //     id: 1,
        //     name: 'Todo 1'
        // },
        // {
        //     id: 2,
        //     name: 'Todo 2'
        // }
    ],
    error: ''
};

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            let todoList = state.todoList;
            if (!action.error) {
                todoList.push({id: action.id, name: action.name});
            }

            return Object.assign({}, state, {
                error: action.error,
                todoList
            });

        case GET_TODO_LIST:
            return Object.assign({}, state, {
                todoList: action.todoList
            });

        default:
            return state;
    }
}

const TodoReducer = {
    todo: todoReducer
};

export default TodoReducer;

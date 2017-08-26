import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {TodoReducer} from './pages/todo';
import {AuthReducer} from './pages/auth';

export default combineReducers({
    routing: routerReducer,
    ...TodoReducer,
    ...AuthReducer
});

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {TodoReducer} from './pages/todo';

export default combineReducers({
    routing: routerReducer,
    ...TodoReducer
});

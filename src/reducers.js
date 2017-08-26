import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {TodoReducer} from './pages/todo';
import {AuthReducer} from './pages/auth';
import {SidebarReducer} from './components/sidebar';
import {RubricReducer} from './pages/rubrics';

export default combineReducers({
    routing: routerReducer,
    ...TodoReducer,
    ...AuthReducer,
    ...SidebarReducer,
    ...RubricReducer
});

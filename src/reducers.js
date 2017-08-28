import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {TodoReducer} from './pages/todo';
import {AuthReducer} from './pages/auth';
import {RubricReducer} from './pages/rubrics';
import {ArticleReducer} from './pages/articles';

export default combineReducers({
    routing: routerReducer,
    ...TodoReducer,
    ...AuthReducer,
    ...RubricReducer,
    ...ArticleReducer
});

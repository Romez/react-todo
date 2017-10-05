import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {AuthReducer} from './pages/auth';
import {RubricReducer} from './pages/rubrics';
import {ArticleReducer} from './pages/articles';
import {SettingsReducer} from './pages/settings';
import {FlashReducer} from './components/flash';
import {ChatReducer} from './components/chat';

export default combineReducers({
    routing: routerReducer,
    ...AuthReducer,
    ...RubricReducer,
    ...ArticleReducer,
    ...SettingsReducer,
    ...FlashReducer,
    ...ChatReducer
});

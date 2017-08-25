import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {DevTools} from './utils';

function _getMiddleware() {
    const middleware = [thunk];

    return applyMiddleware(...middleware);
}

export default function configureStore(intialState) {
    return compose(
        _getMiddleware(),
        DevTools.instrument()
    )(createStore)(rootReducer, intialState);
}

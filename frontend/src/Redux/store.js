import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loadingReducer';

const rootReducer = combineReducers({
    loading: loadingReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
);

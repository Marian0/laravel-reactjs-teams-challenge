import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loadingReducer';
import snackbarReducer from './reducers/snackbarReducer';

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    loading: loadingReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
);

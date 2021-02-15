import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = process.env.NODE_ENV === "development"
    ? createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                thunk,
                loggerMiddleware
            )
        )
    ) : createStore(
        rootReducer,
        applyMiddleware(
            thunk
        )
    );
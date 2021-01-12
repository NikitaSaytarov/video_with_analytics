import rootReducer from './rootReducer'
import {applyMiddleware, compose, createStore} from "redux";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {useDispatch} from "react-redux";
import logger from 'redux-logger';
import getState from "./getState";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/root-saga";

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
    middleware.push(logger);
}

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = configureStore({
    reducer: rootReducer(),
    preloadedState: getState(),
    middleware: middleware,
    devTools: devMode
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducers } from './reducers';
import rootSaga from './sagas';

export const configureStore = (initialState = undefined) => {
  const composeEnhancers = composeWithDevTools({});

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const storeEnhancer = composeEnhancers(...enhancers);

  const store = createStore(reducers, initialState, storeEnhancer);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

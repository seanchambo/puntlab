import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { responsiveStoreEnhancer } from 'redux-responsive';

const rMiddleware = routerMiddleware(browserHistory)
import rootReducer from '../reducers';

const middlewares = [
  thunkMiddleware,
  rMiddleware,
];

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  responsiveStoreEnhancer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(history, initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}
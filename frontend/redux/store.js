// @flow

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './modules';

export default () => {
  const middleware = [
    createLogger({
      collapsed: true,
      duration: true,
      diff: true,
      predicate: (getState, action) => action.type,
      actionTransformer: action => {
        if (!action.type && Array.isArray(action.types)) {
          action.type = action.types[0];
        }

        return action;
      },
    }),
    thunk,
  ];

  return createStore(reducers, applyMiddleware(...middleware));
};

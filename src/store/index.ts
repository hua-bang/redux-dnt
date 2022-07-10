import { Action } from './../lib/redux-nut/typings';

// import { createStore, Action, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { createStore } from '../lib/redux-nut';
import { applyMiddleware } from '../lib/redux-nut/applyMiddleware';

function counterReducer(state = 0, action: Action<'incremented' | 'decremented'>) {
  switch (action.type) {
    case 'incremented':
      return state + 1;
    case 'decremented':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer, applyMiddleware(thunk as any, logger as any));

export default store;
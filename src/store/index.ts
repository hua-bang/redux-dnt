import { Action } from './../lib/redux-nut/typings';
import { createStore } from '../lib/redux-nut';

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

const store = createStore(counterReducer);

export default store;
import { Store, Middleware, Reducer } from './typings';
import { AnyAction } from 'redux';
import { createStore as CreateStore } from './index';

export function applyMiddleware<S extends any>(...middleWares: Middleware<S>[]) {
  return (createStore: typeof CreateStore) => (reducer: Reducer<S, AnyAction>): Store<S, AnyAction> => {
    const store = createStore<S, AnyAction>(reducer);
    let dispatch = store.dispatch;

    const midApi: Store<S, AnyAction> = {
      ...store,
      dispatch: (action: AnyAction, ...args: any[]) => dispatch(action, ...args)
    };
    const middlewareChain = middleWares.map(middleware => middleware(midApi));

    dispatch = compose(...middlewareChain)(store.dispatch);
    
    return {
      ...store,
      dispatch
    };
  }
}

function compose(...funcs: Array<Function>): Function {
  if(funcs.length === 0) {
    return (...args: any[]) => args;
  } 
  if(funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
}
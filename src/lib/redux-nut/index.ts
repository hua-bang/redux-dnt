import { Reducer, Store, Dispatch, AnyAction, Enhancer } from './typings';

export function createStore<S, A extends AnyAction>(
  reducer: Reducer<S, A>, 
  enhancer?: Enhancer<S, A>
): Store<S, A> {
  if(enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState: S | undefined;
  let currentListeners: Array<() => void> = [];

  const getState = () => currentState;

  const subscribe: Store<S, A>['subscribe'] = (fn) => {
    currentListeners.push(fn);
    return () => {
      const index = currentListeners.findIndex(fn);
      currentListeners.splice(index, 1);
    }
  }

  const dispatch: Dispatch<A> = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
  }

  dispatch({ type: 'SystemInit' } as A);

  return {
    getState,
    subscribe,
    dispatch,
  }
}
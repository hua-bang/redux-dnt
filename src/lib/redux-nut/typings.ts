export interface Dispatch<A extends AnyAction> {
  (params: A): void;
}

export interface Action<T = any> {
  type: T
}

export interface AnyAction<T = any> extends Action<T> {
  [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface Store<T extends any, A extends AnyAction> {
  getState: () => T | undefined;
  subscribe: (fn: () => void) => () => void;
  dispatch: Dispatch<A>;
}
import { Store, Middleware } from '../lib/redux-nut/typings';

const loggerMiddleware: Middleware<any> = (storeAPI) => (next) => (action) => {
  console.log('dispatching', action)
  let result = next(action);
  console.log('next state1', storeAPI.getState());
  return result;
}

export default loggerMiddleware;
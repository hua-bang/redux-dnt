const logger2Middleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state2', storeAPI.getState())
  return result
}

export default logger2Middleware;
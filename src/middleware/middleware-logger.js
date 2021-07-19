const middlewareLogger = store => next => action => {
  console.log('Original state:', store.getState())
  console.log('Original action:', action)
  next(action)
  console.log('New updated state:', store.getState())
}

export default middlewareLogger
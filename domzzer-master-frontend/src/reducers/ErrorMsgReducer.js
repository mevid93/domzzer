const errorMsgReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      if (action.errorMsg === undefined){
        return null
      }
      return action.errorMsg
    default:
      return state
  }
}

export const errorMsgChange = errorMsg => {
  return {
    type: 'SET_ERROR_MESSAGE',
    errorMsg
  }
}

export default errorMsgReducer
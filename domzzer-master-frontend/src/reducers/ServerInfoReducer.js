const serverInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SERVER_INFO':
      return action.info
    default:
      return state
  }
}

export const serverInfoChange = info => {
  return {
    type: 'SET_SERVER_INFO',
    info
  }
}

export default serverInfoReducer
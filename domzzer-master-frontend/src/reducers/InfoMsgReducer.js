const infoMsgReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_INFO_MESSAGE':
      if (action.infoMsg === undefined) {
        return null
      }
      return action.infoMsg
    default:
      return state
  }
}

export const infoMsgChange = infoMsg => {
  return {
    type: 'SET_INFO_MESSAGE',
    infoMsg
  }
}

export default infoMsgReducer
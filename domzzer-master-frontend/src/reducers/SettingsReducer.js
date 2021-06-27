const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return action.settings
    default:
      return state
  }
}

export const setSettings = settings => {
  return {
    type: 'SET_SETTINGS',
    settings
  }
}

export default settingsReducer
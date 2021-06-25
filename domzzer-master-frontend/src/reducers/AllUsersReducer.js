
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_USERS':
      return action.allUsers
    case 'RESET_ALL_USERS':
      return []
    default:
      return state
  }
}

export const setAllUsers = allUsers => {
  return {
    type: 'SET_ALL_USERS',
    allUsers
  }
}

export const resetAllUsers = () => {
  return {
    type: 'RESET_ALL_USERS',
  }
}

export default allUsersReducer
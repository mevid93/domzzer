
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_USERS':
      return action.allUsers
    case 'RESET_ALL_USERS':
      return []
    case 'INSERT_USER':
      if (state.find(u => u.id === action.user.id)) {
        return state
      }
      return state.concat(action.user)
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

export const insertUser = (user) => {
  return {
    type: 'INSERT_USER',
    user
  }
}

export default allUsersReducer
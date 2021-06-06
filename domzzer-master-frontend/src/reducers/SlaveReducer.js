const slaveReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SLAVES':
      return action.slaves
    default:
      return state
  }
}

export const slavesChange = slaves => {
  return {
    type: 'SET_SLAVES',
    slaves
  }
}

export default slaveReducer
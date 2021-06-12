const slaveReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SLAVES':
      return action.slaves
    case 'INSERT_SLAVE':
      if (state.find(s => s.id === action.slave.id)) {
        return state
      }
      return state.concat(action.slave)
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

export const slaveInsert = slave => {
  return {
    type: 'INSERT_SLAVE',
    slave
  }
}

export default slaveReducer
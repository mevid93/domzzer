import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import serverInfoReducer from './reducers/ServerInfoReducer'
import slaveReducer from './reducers/SlaveReducer'

const reducer = combineReducers({
  serverInfo: serverInfoReducer,
  slaves: slaveReducer
})
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
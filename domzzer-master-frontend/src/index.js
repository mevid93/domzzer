import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from "react-router-dom"

import App from './App'
import serverInfoReducer from './reducers/ServerInfoReducer'
import slaveReducer from './reducers/SlaveReducer'
import vulnerabilityReducer from './reducers/VulnerabilityReducer'
import infoMsgReducer from './reducers/InfoMsgReducer'
import errorMsgReducer from './reducers/ErrorMsgReducer'
import userReducer from './reducers/UserReducer'
import allUsersReducer from './reducers/AllUsersReducer'
import settingsReducer from './reducers/SettingsReducer'

const reducer = combineReducers({
  serverInfo: serverInfoReducer,
  slaves: slaveReducer,
  vulnerabilities: vulnerabilityReducer,
  infoMsg: infoMsgReducer,
  errorMsg: errorMsgReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  settings: settingsReducer,
})
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
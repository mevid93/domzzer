import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMessager } from '../hooks/Messager'
import { serverInfoChange } from '../reducers/ServerInfoReducer'
import serverInfoService from '../services/ServerInfoService'
import ServerInfo from './ServerInfo'
import VulnerabilityInfo from './VulnerabilityInfo'

const HomePage = () => {
  const messager = useMessager()
  const dispatch = useDispatch()
  const serverInfo = useSelector(state => state.serverInfo)

  useEffect(() => {
    serverInfoService
      .getInfo()
      .then(info => dispatch(serverInfoChange(info)))
      .catch((exception) => {
        const error = exception.response.data.error || "Could not retrieve server information!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer / Home</h1>
      <h3>Master Server Information</h3>
      <ServerInfo serverInfo={serverInfo} />
      <br />
      <h3>Vulnerability Information</h3>
      <VulnerabilityInfo serverInfo={serverInfo} />
    </div>
  )
}

export default HomePage
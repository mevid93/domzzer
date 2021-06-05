import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverInfoChange } from '../reducers/ServerInfoReducer'
import serverInfoService from '../services/ServerInfoService'

const ServerInfo = ({ serverInfo }) => {
  if (serverInfo === undefined || serverInfo === null) {
    return (
      <div>
        <p>Server information not available!</p>
      </div>
    )
  }
  return (
    <div>
      <p>Master-server name: {serverInfo.serverName}</p>
      <p>Master-server OS: {serverInfo.serverType}</p>
      <p>Master-server OS-version: {serverInfo.serverVersion}</p>
      <p>Master-server memory: {serverInfo.serverMemoryMb} Mb</p>
      <p>Master-server date: {serverInfo.serverDate}</p>
      <p>Master-server uptime: {serverInfo.serverUptime}</p>
      <p>Number of slave machines: {serverInfo.numberOfSlaves}</p>
      <p>Number of tests performed: {serverInfo.numberOfTestsPerformed}</p>
      <p>Number of potential vulnerabilities found: {serverInfo.numberOfPotentialVulnerabilities}</p>
    </div>
  )
}

const Home = () => {
  const dispatch = useDispatch()
  const serverInfo = useSelector(state => state.serverInfo)

  useEffect(() => {
    serverInfoService
      .getInfo()
      .then(info => dispatch(serverInfoChange(info)))
      .catch(e => console.log("Could not connect to master-server!"))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer - Home</h1>
      <ServerInfo serverInfo={serverInfo} />
    </div>
  )
}

export default Home
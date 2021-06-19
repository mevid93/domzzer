import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMessager } from '../hooks/Messager'
import { serverInfoChange } from '../reducers/ServerInfoReducer'
import serverInfoService from '../services/ServerInfoService'

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const ServerInfo = ({ serverInfo }) => {
  if (serverInfo === undefined || serverInfo.serverName === undefined) {
    return (
      <div>
        <p>Server information not available!</p>
      </div>
    )
  }
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key="1">
            <TableCell align="left">Server name:</TableCell>
            <TableCell align="left">{serverInfo.serverName}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell align="left">Server OS:</TableCell>
            <TableCell align="left">{serverInfo.serverType}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell align="left">Server OS-version:</TableCell>
            <TableCell align="left">{serverInfo.serverVersion}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell align="left">Server memory:</TableCell>
            <TableCell align="left">{serverInfo.serverMemoryMb}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell align="left">Server date:</TableCell>
            <TableCell align="left">{serverInfo.serverDate}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell align="left">Server uptime:</TableCell>
            <TableCell align="left">{serverInfo.serverUptime}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell align="left">Server controlled slave machines:</TableCell>
            <TableCell align="left">{serverInfo.numberOfSlaves}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const VulnerabilityInfo = ({ serverInfo }) => {
  if (serverInfo === undefined || serverInfo.serverName === undefined) {
    return (
      <div>
        <p>Server information not available!</p>
      </div>
    )
  }
  const tests = serverInfo.numberOfTestsPerformed
  const vulnerabilities = serverInfo.numberOfPotentialVulnerabilities
  const ratio = (tests !== undefined && tests !== 0) ? vulnerabilities / tests : 0
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key="1">
            <TableCell align="left">Number of tests performed:</TableCell>
            <TableCell align="right">{tests}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell align="left">Number of potential vulnerabilities found:</TableCell>
            <TableCell align="right">{vulnerabilities}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell align="left">Potential vulnerabilities to tests ratio:</TableCell>
            <TableCell align="right">{ratio}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Home = () => {
  const messager = useMessager()
  const dispatch = useDispatch()
  const serverInfo = useSelector(state => state.serverInfo)

  useEffect(() => {
    serverInfoService
      .getInfo()
      .then(info => dispatch(serverInfoChange(info)))
      .catch(() => {
        messager.showErrorMessage("Could not retrieve server information!")
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

export default Home
import React from 'react'

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

export default ServerInfo
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { vulnerabilitiesChange } from '../reducers/VulnerabilityReducer'
import vulnerabilityService from '../services/VulnerabilityService'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/'

const VulnerabilityTable = ({ vulnerabilities }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Server address</TableCell>
            <TableCell>Target browser</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vulnerabilities.map(v =>
            <TableRow key={v.id}>
              <TableCell align="left"><Link to={`/vulnerabilities/${v.id}`}>{v.id}</Link></TableCell>
              <TableCell align="left">{v.serverAddress}</TableCell>
              <TableCell align="left">{v.targetBrowser}</TableCell>
              <TableCell align="left">{v.timestamp}</TableCell>
              <TableCell align="left">{v.status}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Vulnerabilities = () => {
  const dispatch = useDispatch()
  const vulnerabilities = useSelector(state => state.vulnerabilities)

  useEffect(() => {
    vulnerabilityService
      .getAll()
      .then(vulnerabilities => dispatch(vulnerabilitiesChange(vulnerabilities)))
      .catch(e => {
        console.log(e)
        console.log("Could not connect to master-server!")
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer - Vulnerabilities</h1>
      <h3>Vulnerabilities in Database</h3>
      <VulnerabilityTable vulnerabilities={vulnerabilities} />
    </div>
  )
}

export default Vulnerabilities
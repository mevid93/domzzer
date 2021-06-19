import React from 'react'
import { Link } from "react-router-dom"

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const SlaveTable = ({ slaves }) => {
  return (
    <TableContainer style={{ marginTop: 30 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Server name</TableCell>
            <TableCell>Server addess</TableCell>
            <TableCell>Server status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slaves.map(s =>
            <TableRow key={s.id}>
              <TableCell align="left"><Link to={`/slaves/${s.id}`}>{s.name}</Link></TableCell>
              <TableCell align="left">{s.address}</TableCell>
              <TableCell align="left">{s.status}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SlaveTable
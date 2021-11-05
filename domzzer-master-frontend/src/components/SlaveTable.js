import React, { useState } from 'react'
import { Link } from "react-router-dom"

import StyledTableRow from './StyledTableRow'
import StyledTableCell from './StyledTableCell'

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'

const SlaveTable = ({ slaves }) => {
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, slaves.length - page * rowsPerPage);


  return (
    <TableContainer style={{ marginTop: 50 }}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Server name</StyledTableCell>
            <StyledTableCell>Server address</StyledTableCell>
            <StyledTableCell>Server status</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {slaves
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(s =>
              <StyledTableRow key={s.id}>
                <StyledTableCell align="left"><Link to={`/slaves/${s.id}`}>{s.name}</Link></StyledTableCell>
                <StyledTableCell align="left">{s.address}</StyledTableCell>
                <StyledTableCell align="left">{s.status}</StyledTableCell>
              </StyledTableRow>
            )}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>)}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={slaves.length}
        rowsPerPage={10}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />
    </TableContainer>
  )
}

export default SlaveTable
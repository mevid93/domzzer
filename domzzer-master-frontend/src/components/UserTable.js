import React, { useState } from 'react'
import { Link } from "react-router-dom"

import StyledTableRow from './StyledTableRow'
import StyledTableCell from './StyledTableCell'

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'

const UserTable = ({ users }) => {
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <TableContainer style={{ marginTop: 50 }}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>User Role</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(u =>
              <StyledTableRow key={u.id}>
                <StyledTableCell align="left"><Link to={`/users/${u.id}`}>{u.username}</Link></StyledTableCell>
                <StyledTableCell align="left">{u.userRole}</StyledTableCell>
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
        count={users.length}
        rowsPerPage={10}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />
    </TableContainer >
  )
}

export default UserTable
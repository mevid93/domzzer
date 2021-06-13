import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { slavesChange } from '../reducers/SlaveReducer'
import { errorMsgChange } from '../reducers/ErrorMsgReducer'
import slaveService from '../services/SlaveService'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core/'

const SlaveTable = ({ slaves }) => {
  return (
    <TableContainer>
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

const Slaves = () => {
  const dispatch = useDispatch()
  const slaves = useSelector(state => state.slaves)

  useEffect(() => {
    slaveService
      .getAll()
      .then(slaves => dispatch(slavesChange(slaves)))
      .catch(e => {
        dispatch(errorMsgChange("Could not retrieve slave information from server!"))
        setTimeout(() => {
          dispatch(errorMsgChange(null))
        }, 5000)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer / Slaves</h1>
      <Button color="primary" variant="contained" component={Link} to="/slaves/new">add new slave</Button>
      <h3>Slaves in Database</h3>
      <SlaveTable slaves={slaves} />
    </div>
  )
}

export default Slaves
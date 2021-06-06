import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { slavesChange } from '../reducers/SlaveReducer'
import slaveService from '../services/SlaveService'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/'

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
              <TableCell align="left">{s.name}</TableCell>
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
      .catch(e => console.log("Could not connect to master-server!"))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer - Slaves</h1>
      <h3>Slaves in Database</h3>
      <SlaveTable slaves={slaves} />
    </div>
  )
}

export default Slaves
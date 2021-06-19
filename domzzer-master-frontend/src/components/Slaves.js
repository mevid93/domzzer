import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { slavesChange } from '../reducers/SlaveReducer'
import { errorMsgChange } from '../reducers/ErrorMsgReducer'
import slaveService from '../services/SlaveService'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core/'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const SlaveTable = ({ slaves }) => {
  return (
    <TableContainer style={{marginTop: 30}}>
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
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()
  const slaves = useSelector(state => state.slaves)
  const filteredSlaves = slaves.filter(s => {
    if (s.name.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    if (s.address.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    if (s.status.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    return false
  })

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>domzzer / Slaves</h1>
      <Grid container spacing={3} justify="space-around">
        <Grid item xs={6} style={{display:"flex", justifyContent: "flex-start"}}>
          <TextField onChange={handleFilterChange} fullWidth value={filter} placeholder="filter by keyword"/>
        </Grid>
        <Grid item xs={6} style={{display:"flex", justifyContent: "center"}}>
          <Button color="primary" variant="contained" component={Link} to="/slaves/new">add new slave</Button>
        </Grid>
      </Grid>
      <SlaveTable slaves={filteredSlaves} />
    </div>
  )
}

export default Slaves
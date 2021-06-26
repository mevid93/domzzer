import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { setSlaves } from '../reducers/SlaveReducer'
import slaveService from '../services/SlaveService'
import { useMessager } from '../hooks/Messager'
import SlaveTable from './SlaveTable'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const SlavesPage = () => {
  const dispatch = useDispatch()
  const messager = useMessager()
  const [filter, setFilter] = useState('')
  const slaves = useSelector(state => state.slaves)
  const user = useSelector(state => state.user)

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
      .then(resultSlaves => dispatch(setSlaves(resultSlaves)))
      .catch(exception => {
        const error = exception.response.data.error || "Could not retrieve slave data from server!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer / Slaves</h1>

      <Grid container spacing={3} justify="flex-start">

        <Grid item xs={6} style={{ marginTop: 15, display: "flex", justifyContent: "flex-start" }}>
          <TextField
            onChange={(event) => setFilter(event.target.value)}
            fullWidth
            value={filter}
            placeholder="filter by keyword"
          />
        </Grid>

        {user !== null && user.userRole !== 'LITE' &&
          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/slaves/new"
            >add new slave</Button>
          </Grid>
        }
      </Grid>

      <SlaveTable slaves={filteredSlaves} />
    </div>
  )
}

export default SlavesPage
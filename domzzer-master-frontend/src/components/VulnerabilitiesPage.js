import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMessager } from '../hooks/Messager'
import { vulnerabilitiesChange } from '../reducers/VulnerabilityReducer'
import vulnerabilityService from '../services/VulnerabilityService'
import VulnerabilityTable from './VulnerabilityTable'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const VulnerabilitiesPage = () => {
  const dispatch = useDispatch()
  const messager = useMessager()
  const [filter, setFilter] = useState('')
  const vulnerabilities = useSelector(state => state.vulnerabilities)

  const filteredVulnerabilities = vulnerabilities.filter(v => {
    if (v.serverAddress.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    if(v.targetBrowser.toLowerCase().includes(filter.toLowerCase())){
      return true
    }
    if(v.timestamp.toLowerCase().includes(filter.toLowerCase())){
      return true
    }
    if(v.status.toLowerCase().includes(filter.toLowerCase())){
      return true
    }
    return false
  })

  useEffect(() => {
    vulnerabilityService
      .getAll()
      .then(vulnerabilities => dispatch(vulnerabilitiesChange(vulnerabilities)))
      .catch(exception => {
        const error = exception.response.data.error || "Could not retrieve slave data from server!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer / Vulnerabilities</h1>

      <Grid container spacing={3} justify="flex-start">

        <Grid item xs={6} style={{ marginTop: 15, display: "flex", justifyContent: "flex-start" }}>
          <TextField
            onChange={(event) => setFilter(event.target.value)}
            fullWidth
            value={filter}
            placeholder="filter by keyword"
          />
        </Grid>

      </Grid>

      <VulnerabilityTable vulnerabilities={filteredVulnerabilities} />
    </div>
  )
}

export default VulnerabilitiesPage
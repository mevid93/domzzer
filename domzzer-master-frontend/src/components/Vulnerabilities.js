import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMessager } from '../hooks/Messager'
import { vulnerabilitiesChange } from '../reducers/VulnerabilityReducer'
import vulnerabilityService from '../services/VulnerabilityService'
import VulnerabilityTable from './VulnerabilityTable'

const Vulnerabilities = () => {
  const messager = useMessager()
  const dispatch = useDispatch()
  const vulnerabilities = useSelector(state => state.vulnerabilities)

  useEffect(() => {
    vulnerabilityService
      .getAll()
      .then(vulnerabilities => dispatch(vulnerabilitiesChange(vulnerabilities)))
      .catch(() => {
        messager.showErrorMessage("Could not retrieve vulnerability information from server!")
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer / Vulnerabilities</h1>
      <h3>Vulnerabilities in Database</h3>
      <VulnerabilityTable vulnerabilities={vulnerabilities} />
    </div>
  )
}

export default Vulnerabilities
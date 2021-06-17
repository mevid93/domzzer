import React, { useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import slaveService from '../services/SlaveService'
import { slaveInsert, slavesChange } from '../reducers/SlaveReducer'

const Slave = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams().id
  const slaves = useSelector(state => state.slaves)
  const slave = slaves.find(s => s.id === id)

  useEffect(() => {
    slaveService.getById(id)
      .then(slave => {
        dispatch(slaveInsert(slave))
      })
      .catch(error => {
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteSlave = () => {
    slaveService.remove(id)
      .then(() => {
        const filteredSlaves = slaves.filter(s => s.id !== id)
        dispatch(slavesChange(filteredSlaves))
        history.push('/slaves')
      })
      .catch(error => {
      })
  }

  if (slave === undefined) {
    return (
      <div>
        <h1>domzzer - Slaves - 404 (Slave not found) </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>domzzer / Slaves / {slave.name} </h1>
      <h3>address: {slave.address}</h3>
      <h3>status: {slave.status}</h3>
      <button onClick={deleteSlave}>Remove slave from database</button>
    </div>
  )
}

export default Slave
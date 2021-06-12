import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import slaveService from '../services/SlaveService'
import { slaveInsert } from '../reducers/SlaveReducer'

const Slave = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const slaves = useSelector(state => state.slaves)
  const slave = slaves.find(s => s.id === id)

  // try to get the slave from server in case direct url access
  useEffect(() => {
    slaveService.getById(id)
      .then(slave => {
        dispatch(slaveInsert(slave))
      })
      .catch(error => {
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (slave === undefined) {
    return (
      <div>
        <h1>domzzer - Slaves - 404 (Slave not found) </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>domzzer - Slaves - {slave.name} </h1>
      <h3>address: {slave.address}</h3>
      <h3>status: {slave.status}</h3>
    </div>
  )
}

export default Slave
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab/'

const InfoNotification = () => {
  const infoMsg = useSelector(state => state.infoMsg)

  if (infoMsg === null || infoMsg === undefined) {
    return null
  }

  return (
    <div>
      <Alert variant="filled" severity="success">{infoMsg}</Alert>
    </div>
  )
}

export default InfoNotification
import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab/'

const InfoNotification = () => {
  const infoMsg = useSelector(state => state.infoMsg)

  return (
    <div>
      {(infoMsg !== null && infoMsg !== undefined) && <Alert variant="filled" severity="success">{infoMsg}</Alert>}
    </div >
  )
}

export default InfoNotification
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab/'

const ErrorNotification = () => {
  const errorMsg = useSelector(state => state.errorMsg)

  if (errorMsg === null || errorMsg === undefined) {
    return null
  }

  return (
    <div>
      <Alert variant="filled" severity="error">{errorMsg}</Alert>
    </div>
  )
}

export default ErrorNotification
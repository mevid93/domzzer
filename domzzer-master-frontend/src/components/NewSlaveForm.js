import React, { useState } from 'react'

import slaveService from '../services/SlaveService'
import { useMessager } from '../hooks/Messager'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 2),
  }
}))

const NewSlaveForm = () => {
  const messager = useMessager()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addSlave = (event) => {
    event.preventDefault()

    const newSlave = { name, address, username, password }

    slaveService.create(newSlave)
      .then(() => {
        messager.showInfoMessage("Succesfully added new slave to database!")
        setName('')
        setAddress('')
        setUsername('')
        setPassword('')
      })
      .catch(() => {
        messager.showErrorMessage("Could not add new slave to database!!!")
      })
  }

  return (
    <div>
      <h1>domzzer / Slaves / New</h1>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>

          <Typography gutterBottom variant="h3">Add New Slave</Typography>

          <form onSubmit={addSlave} className={classes.form}>

            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(event) => setName(event.target.value)}
              value={name}
            />

            <TextField
              label="Address"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(event) => setAddress(event.target.value)}
              value={address}
            />

            <TextField
              label="Username (optional)"
              variant="outlined"
              margin="normal"
              required={false}
              fullWidth
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />

            <TextField
              label="Password (optional)"
              variant="outlined"
              margin="normal"
              required={false}
              fullWidth
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Add</Button>

          </form>

        </div>
      </Container>
    </div >
  )
}

export default NewSlaveForm
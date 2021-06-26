import React, { useState } from 'react'

import slaveService from '../services/SlaveService'
import { useMessager } from '../hooks/Messager'
import { useSelector, useDispatch } from 'react-redux'
import { setSlaves } from '../reducers/SlaveReducer'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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

const EditSlaveForm = ({ slave }) => {
  const classes = useStyles()
  const messager = useMessager()
  const dispatch = useDispatch()
  const slaves = useSelector(state => state.slaves)
  const loggeduser = useSelector(state => state.user)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(slave.name)
  const [address, setAddress] = useState(slave.address)
  const [username, setUsername] = useState(slave.username || '')
  const [password, setPassword] = useState(slave.password || '')

  const updateSlave = (event) => {
    event.preventDefault()
    const updatedSlaveData = { name, address, username, password }
    slaveService
      .update(slave.id, updatedSlaveData)
      .then(resultSlave => {
        messager.showInfoMessage('Slave data succesfully updated!')
        const editedSlaves = slaves.map(s => s.id === resultSlave.id ? resultSlave : s)
        dispatch(setSlaves(editedSlaves))
        setEditMode(false)
      })
      .catch(exception => {
        const error = exception.response.data.error || "Could not update slave data on server!"
        messager.showErrorMessage(error)
      })
  }

  return (
    <div>
      {editMode && <Typography align="center" gutterBottom variant="h3">Editing Slave</Typography>}

      <form onSubmit={updateSlave} className={classes.form}>

        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={name}
          disabled={!editMode}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          label="Address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={address}
          disabled={!editMode}
          onChange={(event) => setAddress(event.target.value)}
        />

        <TextField
          label="Username (optional)"
          variant="outlined"
          margin="normal"
          required={false}
          fullWidth
          value={username}
          disabled={!editMode}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          label="Password (optional)"
          variant="outlined"
          margin="normal"
          required={false}
          fullWidth
          type="password"
          value={password}
          disabled={!editMode}
          onChange={(event) => setPassword(event.target.value)}
        />

        {editMode &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save changes
          </Button>
        }

      </form>

      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.gridItem} xs>

          {loggeduser.userRole !== 'LITE' &&
            <Button
              style={{ marginTop: 25 }}
              onClick={() => {
                setEditMode(!editMode)
                setUsername(slave.username || '')
                setPassword(slave.password || '')
                setAddress(slave.address)
                setName(slave.name)
              }}
              color="primary"
              variant="contained"
              size="large"
            >
              {editMode === false ? 'Edit information' : 'Stop editing'}
            </Button>
          }
        </Grid>
      </Grid>

    </div>
  )
}

export default EditSlaveForm
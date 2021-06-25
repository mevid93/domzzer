import React, { useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import slaveService from '../services/SlaveService'
import { slaveInsert, slavesChange } from '../reducers/SlaveReducer'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridItem: {
    margin: theme.spacing(3, 0, 2)
  },
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

const SlaveForm = ({ slave, classes }) => {
  return (
    <div>
      <form className={classes.form}>

        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={slave.name}
          disabled
        />

        <TextField
          label="Address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={slave.address}
          disabled
        />

        <TextField
          label="Username (optional)"
          variant="outlined"
          margin="normal"
          required={false}
          fullWidth
          value={slave.username}
          disabled
        />

        <TextField
          label="Password (optional)"
          variant="outlined"
          margin="normal"
          required={false}
          fullWidth
          type="password"
          value={slave.password}
          disabled
        />

      </form>
    </div>
  )
}

const SlavePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams().id
  const slaves = useSelector(state => state.slaves)
  const user = useSelector(statue => statue.user)
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
        <h1>domzzer / Slaves / 404 (Slave not found) </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>domzzer / Slaves / {slave.name} </h1>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <SlaveForm slave={slave} classes={classes} />
        </div>
      </Container>

      {user !== null && user.userRole !== 'LITE' &&
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className={classes.gridItem} xs>
            <Button color="primary" variant="contained" size="large">
              Edit information
            </Button>
          </Grid>
          <Grid item xs>
            <Button color="secondary" variant="contained" size="large" onClick={deleteSlave} >
              Remove from database
            </Button>
          </Grid>
        </Grid>
      }
    </div>
  )
}

export default SlavePage
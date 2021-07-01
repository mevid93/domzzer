import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import slaveService from '../services/SlaveService'
import { setSlaves, slaveInsert } from '../reducers/SlaveReducer'
import { useMessager } from '../hooks/Messager'
import DeleteDialog from './DeleteDialog'
import EditSlaveForm from './EditSlaveForm'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

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

const SlavePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const messager = useMessager()
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const id = useParams().id
  const slaves = useSelector(state => state.slaves)
  const user = useSelector(state => state.user)
  const slave = slaves.find(s => s.id === id)

  useEffect(() => {
    slaveService.getById(id)
      .then(slave => {
        dispatch(slaveInsert(slave))
      })
      .catch((exception) => {
        const error = exception.response.data.error || "Could not retrieve slave data from server!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteSlave = () => {
    slaveService.remove(id)
      .then(() => {
        messager.showInfoMessage('Slave data succesfully deleted!')
        const filteredSlaves = slaves.filter(s => s.id !== id)
        dispatch(setSlaves(filteredSlaves))
        history.push('/slaves')
      })
      .catch((exception) => {
        const error = exception.response.data.error || "Could not delete slave data from server!"
        messager.showErrorMessage(error)
      })
  }

  const handleDeleteDialogYesAnswer = () => {
    setDeleteDialogVisible(false)
    deleteSlave()
  }

  const handleDeleteDialogNoAnswer = () => {
    setDeleteDialogVisible(false)
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
          <EditSlaveForm slave={slave} />
        </div>
      </Container>

      {user !== null && user.userRole !== 'LITE' &&
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs>
            <Button
              style={{ marginTop: 25 }}
              color="secondary"
              variant="contained"
              size="large"
              onClick={() => setDeleteDialogVisible(true)}
            >
              Remove from database
            </Button>
            <DeleteDialog
              open={deleteDialogVisible}
              handleDialogYesAnswer={handleDeleteDialogYesAnswer}
              handleDialogNoAnswer={handleDeleteDialogNoAnswer}
            />
          </Grid>
        </Grid>
      }
    </div>
  )
}

export default SlavePage
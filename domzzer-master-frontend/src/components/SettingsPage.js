import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMessager } from '../hooks/Messager'
import EditSettingsForm from './EditSettingsForm'
import { setSettings } from '../reducers/SettingsReducer'
import settingsService from '../services/SettingsService'

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


const SettingsPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const messager = useMessager()
  const loggedUser = useSelector(state => state.user)
  let settings = useSelector(state => state.settings)

  useEffect(() => {
    settingsService.get()
      .then(serverSettings => {
        dispatch(setSettings(serverSettings))
      })
      .catch((exception) => {
        const error = exception.response.data.error || "Could not retrieve server settings!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePollButtonClick = () => {
    if (!settings.isPolling) {
      settingsService
        .sendStartCommand()
        .then(() => {
          messager.showInfoMessage('Succesfully started server to poll slaves!')
          dispatch(setSettings({ ...settings, isPolling: true }))
        })
        .catch(exception => {
          const error = exception.response.data.error || "Could not start server to poll slaves!"
          messager.showErrorMessage(error)
        })
    } else {
      settingsService
        .sendStopCommand()
        .then(() => {
          messager.showInfoMessage('Succesfully stopped server from polling slaves!')
          dispatch(setSettings({ ...settings, isPolling: false }))
        })
        .catch(exception => {
          const error = exception.response.data.error || "Could not stop from polling slaves!"
          messager.showErrorMessage(error)
        })
    }
  }

  return (
    <div>
      <h1>domzzer / Settings </h1>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <EditSettingsForm settings={settings} />
        </div>
      </Container>

      <Grid container direction="column" justify="center" alignItems="center">
        {loggedUser !== null && loggedUser.userRole === 'ADMIN' &&
          <Grid item xs>
            <Button
              style={{ marginTop: 25 }}
              color={settings.isPolling === true ? "secondary" : "primary"}
              variant="contained"
              size="large"
              onClick={handlePollButtonClick}
            >
              {settings.isPolling === true ? "stop polling slaves" : "start polling slaves"}
            </Button>
          </Grid>
        }
      </Grid>

    </div>
  )
}

export default SettingsPage
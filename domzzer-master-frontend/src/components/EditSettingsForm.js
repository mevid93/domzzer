import React, { useState } from 'react'

import { useMessager } from '../hooks/Messager'
import { useSelector, useDispatch } from 'react-redux'

import settingsService from '../services/SettingsService'
import { setSettings } from '../reducers/SettingsReducer'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
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

const EditSettingsForm = ({ slave }) => {
  const classes = useStyles()
  const messager = useMessager()
  const dispatch = useDispatch()
  const loggeduser = useSelector(state => state.user)
  const settings = useSelector(state => state.settings)
  const [editMode, setEditMode] = useState(false)
  const [pollInterval, setPollInterval] = useState(settings.pollInterval || 10)

  const updateSettings = (event) => {
    event.preventDefault()
    const updatedSettings = { pollInterval }
    settingsService
      .update(updatedSettings)
      .then(resultSettings => {
        messager.showInfoMessage('Settings succesfully updated!')
        dispatch(setSettings(resultSettings))
        setEditMode(false)
      })
      .catch(exception => {
        const error = exception.response.data.error || "Could not update settings on server!"
        messager.showErrorMessage(error)
      })
  }

  return (
    <div>
      {editMode && <Typography align="center" gutterBottom variant="h3">Editing Settings</Typography>}

      <form onSubmit={updateSettings} className={classes.form}>

        <FormControl
          margin="normal"
          fullWidth
          variant="outlined"
          disabled={!editMode}
        >
          <InputLabel id="select-intaval-label">Slave polling inteval</InputLabel>
          <Select
            labelId="select-interval-label"
            id="select-interval"
            value={pollInterval}
            defaultValue={10}
            onChange={(event) => setPollInterval(event.target.value)}
            label="Slave polling inteval"
          >
            <MenuItem value={10}>10 minutes</MenuItem>
            <MenuItem value={20}>20 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={60}>1 hour</MenuItem>
          </Select>
        </FormControl>

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

      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item className={classes.gridItem} xs>

          {loggeduser.userRole !== 'LITE' &&
            <Button
              style={{ marginTop: 25 }}
              onClick={() => {
                setEditMode(!editMode)
                setPollInterval(settings.pollInterval || 10)
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

export default EditSettingsForm
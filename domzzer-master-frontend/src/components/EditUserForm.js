import React, { useState } from 'react'

import userService from '../services/UserService'
import { useMessager } from '../hooks/Messager'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
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

const EditUserForm = ({ user }) => {
  const classes = useStyles()
  const messager = useMessager()
  const [editMode, setEditMode] = useState(false)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState(user.userRole)

  const updateUser = (event) => {
    event.preventDefault()
    const updatedUserData = { username, password, userRole }
    userService
      .update(user.id, updatedUserData)
      .then(updatedUser => {
        messager.showInfoMessage('User data succesfully updated!')
        setEditMode(false)
        setPassword('')
      })
      .catch(exception => {
        const error = exception.response.data.error || "Could not update user data on server!"
        messager.showErrorMessage(error)
      })
  }

  return (
    <div>
      {editMode && <Typography align="center" gutterBottom variant="h3">Editing User</Typography>}

      <form onSubmit={updateUser} className={classes.form}>

        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          disabled={!editMode}
        />

        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          disabled={!editMode}
        />

        <FormControl
          margin="normal"
          fullWidth
          variant="outlined"
          disabled={!editMode}
        >
          <InputLabel id="select-user-role-label">User Role</InputLabel>
          <Select
            labelId="select-user-role-label"
            id="select-user-role"
            value={userRole}
            onChange={(event) => setUserRole(event.target.value)}
            label="User Role"
          >
            <MenuItem value={'LITE'}>LITE</MenuItem>
            <MenuItem value={'PRO'}>PRO</MenuItem>
            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
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
          <Button
            style={{ marginTop: 25 }}
            onClick={() => {
              setEditMode(!editMode)
              setUsername(user.username)
              setUserRole(user.userRole)
            }}
            color="primary"
            variant="contained"
            size="large"
          >
            {editMode === false ? 'Edit information' : 'Stop editing'}
          </Button>
        </Grid>
      </Grid>

    </div>
  )
}

export default EditUserForm
import React, { useState } from 'react'

import userService from '../services/UserService'
import { useMessager } from '../hooks/Messager'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

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

const NewUserPage = () => {
  const messager = useMessager()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [userRole, setUserRole] = useState('LITE')
  const [password, setPassword] = useState('')

  const addUser = (event) => {
    event.preventDefault()

    const newUser = { username, userRole, password }

    userService.create(newUser)
      .then(() => {
        messager.showInfoMessage("Succesfully added new user to database!")
        setUsername('')
        setUserRole('')
        setPassword('')
      })
      .catch(exception => {
        const error = exception.response.data.error || 'Could not add new slave to database!'
        messager.showErrorMessage(error)
      })
  }

  return (
    <div>
      <h1>domzzer / Users / New</h1>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>

          <Typography gutterBottom variant="h3">Add New User</Typography>

          <form onSubmit={addUser} className={classes.form}>

            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(event) => setUsername(event.target.value)}
              value={username}
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
            />

            <FormControl
              margin="normal"
              fullWidth
              variant="outlined"
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

export default NewUserPage
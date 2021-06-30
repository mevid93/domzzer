import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

import { setUser } from '../reducers/UserReducer'
import { useMessager } from '../hooks/Messager'
import { useTokenizer } from '../hooks/Tokenizer'
import loginService from '../services/LoginService'

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

const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const messager = useMessager()
  const tokenizer = useTokenizer()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('domzzerUser', JSON.stringify(user))
      tokenizer.updateServicesWithToken(user.token)
      dispatch(setUser(user))
      messager.showInfoMessage(`Welcome, ${user.username}`)
      history.push("/")   
    } catch (exception) {
      const error = exception.response.data.error || "Could not login. Server is likely offline!"
      messager.showErrorMessage(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>

        <Typography gutterBottom variant="h3">domzzer login</Typography>

        <form onSubmit={handleLogin} className={classes.form}>

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>

        </form>

      </div>
    </Container>
  )
}

export default LoginPage
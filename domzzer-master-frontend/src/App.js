import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useHistory, Navigate } from "react-router-dom"

import InfoNotification from './components/InfoNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import NewSlavePage from './components/NewSlavePage'
import SlavesPage from './components/SlavesPage'
import SlavePage from './components/SlavePage'
import VulnerabilitiesPage from './components/VulnerabilitiesPage'
import VulnerabilityPage from './components/VulnerabilityPage'
import NewUserPage from './components/NewUserPage'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import SettingsPage from './components/SettingsPage'
import { setUser, resetUser } from './reducers/UserReducer'
import { useTokenizer } from './hooks/Tokenizer'
import userService from './services/UserService'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import IconButton from "@material-ui/core/IconButton"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  rightToolbar: {
    marginLeft: "auto"
  }
}))

function App() {
  const tokenizer = useTokenizer()
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  let user = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(resetUser())
    window.localStorage.removeItem('domzzerUser')
    history.push('/login')
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('domzzerUser')
    if (loggedUserJSON) {
      const tokenuser = JSON.parse(loggedUserJSON)
      dispatch(setUser(tokenuser))
      tokenizer.updateServicesWithToken(tokenuser.token)
      userService.getById(tokenuser.id).then(() => {
        return
      }).catch(() => {
        dispatch(resetUser())
        tokenizer.clearServicesFromToken()
        window.localStorage.removeItem('domzzerUser')
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            {user !== null &&
              <div>
                <Button color="inherit" component={Link} to="/">home</Button>
                <Button color="inherit" component={Link} to="/slaves">slaves</Button>
                <Button color="inherit" component={Link} to="/vulnerabilities">vulnerabilities</Button>
                {user.userRole === 'ADMIN' && <Button color="inherit" component={Link} to="/users">users</Button>}
                {user.userRole === 'ADMIN' && <Button color="inherit" component={Link} to="/settings">settings</Button>}
              </div>
            }
            {user !== null &&
              <div className={classes.rightToolbar}>
                <IconButton
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Avatar>{user.username[0].toUpperCase()}</Avatar>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} to={`/users/${user.id}`}>Profile settings</MenuItem>
                  <MenuItem onClick={handleLogout} component={Link} to="/login">Logout</MenuItem>
                </Menu>
              </div>
            }
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <InfoNotification />
            <ErrorNotification />

            <Switch>
              <Route path="/login">
                {user === null ? <LoginPage /> : <Navigate to="/" />}
              </Route>
              <Route path="/settings">
                {user !== null && user.userRole === 'ADMIN' ? <SettingsPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/users/new">
                {user !== null && user.userRole === 'ADMIN' ? <NewUserPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/users/:id">
                {user !== null ? <UserPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/users">
                {user !== null && user.userRole === 'ADMIN' ? <UsersPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/vulnerabilities/:id">
                {user !== null ? <VulnerabilityPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/vulnerabilities">
                {user !== null ? <VulnerabilitiesPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/slaves/new">
                {user !== null && user.userRole !== 'LITE' ? <NewSlavePage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/slaves/:id">
                {user !== null ? <SlavePage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/slaves">
                {user !== null ? <SlavesPage /> : <Navigate to="/login" />}
              </Route>
              <Route path="/">
                {user !== null ? <HomePage /> : <Navigate to="/login" />}
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </div>
  )
}

export default App

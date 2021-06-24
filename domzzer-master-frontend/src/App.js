import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useHistory } from "react-router-dom"

import InfoNotification from './components/InfoNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import NewSlaveForm from './components/NewSlaveForm'
import SlavesPage from './components/SlavesPage'
import Slave from './components/Slave'
import Vulnerabilities from './components/Vulnerabilities'
import Vulnerability from './components/Vulnerability'
import { setUser } from './reducers/UserReducer'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'


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
  }
}))

function App() {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('domzzerUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (user === null) {
    history.push('/login')
  }

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
                <Button color="inherit" component={Link} to="/users">users</Button>
                <Button color="inherit" component={Link} to="/settings">settings</Button>
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
              {user === null && <Route path="/login"><LoginPage /></Route>}
              {user !== null && <Route path="/users"></Route>}
              {user !== null && <Route path="/settings"></Route>}
              {user !== null && <Route path="/vulnerabilities/:id"><Vulnerability /></Route>}
              {user !== null && <Route path="/vulnerabilities"><Vulnerabilities /></Route>}
              {user !== null && <Route path="/slaves/new"><NewSlaveForm /></Route>}
              {user !== null && <Route path="/slaves/:id"><Slave /></Route>}
              {user !== null && <Route path="/slaves"><SlavesPage /></Route>}
              {user !== null && <Route path="/"><HomePage /></Route>}
            </Switch>
          </Container>
        </main>
      </div>
    </div>
  )
}

export default App

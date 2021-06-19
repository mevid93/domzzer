import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import InfoNotification from './components/InfoNotification'
import ErrorNotification from './components/ErrorNotification'
import Home from './components/Home'
import NewSlaveForm from './components/NewSlaveForm'
import Slaves from './components/Slaves'
import Slave from './components/Slave'
import Vulnerabilities from './components/Vulnerabilities'
import Vulnerability from './components/Vulnerability'

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
  const classes = useStyles()

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Button color="inherit" component={Link} to="/">home</Button>
            <Button color="inherit" component={Link} to="/slaves">slaves</Button>
            <Button color="inherit" component={Link} to="/vulnerabilities">vulnerabilities</Button>
            <Button color="inherit" component={Link} to="/users">users</Button>
            <Button color="inherit" component={Link} to="/settings">settings</Button>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <InfoNotification />
            <ErrorNotification />

            <Switch>
              <Route path="/users">

              </Route>
              <Route path="/settings">

              </Route>
              <Route path="/vulnerabilities/:id">
                <Vulnerability />
              </Route>
              <Route path="/vulnerabilities">
                <Vulnerabilities />
              </Route>
              <Route path="/slaves/new">
                <NewSlaveForm />
              </Route>
              <Route path="/slaves/:id">
                <Slave />
              </Route>
              <Route path="/slaves">
                <Slaves />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
  )
}

export default App

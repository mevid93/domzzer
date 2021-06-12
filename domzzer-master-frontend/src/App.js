import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { AppBar, Container, Toolbar, Button } from '@material-ui/core/'
import InfoNotification from './components/InfoNotification'
import ErrorNotification from './components/ErrorNotification'
import Home from './components/Home'
import Slaves from './components/Slaves'
import Slave from './components/Slave'
import Vulnerabilities from './components/Vulnerabilities'
import Vulnerability from './components/Vulnerability'

function App() {
  return (
    <Router>
      <Container>

        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">home</Button>
            <Button color="inherit" component={Link} to="/slaves">slaves</Button>
            <Button color="inherit" component={Link} to="/vulnerabilities">vulnerabilities</Button>
            <Button color="inherit" component={Link} to="/settings">settings</Button>
          </Toolbar>
        </AppBar>

        <InfoNotification />
        <ErrorNotification />

        <Switch>
          <Route path="/settings">

          </Route>
          <Route path="/vulnerabilities/:id">
            <Vulnerability />
          </Route>
          <Route path="/vulnerabilities">
            <Vulnerabilities />
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
    </Router>
  )
}

export default App

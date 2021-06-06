import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { AppBar, Container, Toolbar, Button } from '@material-ui/core/'
import Home from './components/Home'
import Slaves from './components/Slaves'

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

        <Switch>
          <Route path="/settings">

          </Route>
          <Route path="/vulnerabilities">

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

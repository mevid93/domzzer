import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { AppBar, Container, Toolbar, Button } from '@material-ui/core/'
import Home from './components/Home'

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

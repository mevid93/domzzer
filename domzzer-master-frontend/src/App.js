import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Home from './components/Home'

function App() {

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/slaves">slaves</Link>
          <Link style={padding} to="/vulnerabilities">vulnerabilities</Link>
          <Link style={padding} to="/settings">settings</Link>
        </div>

        <Switch>
          <Route path="/settings">

          </Route>
          <Route path="/vulnerabilities">

          </Route>
          <Route path="/slaves">

          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

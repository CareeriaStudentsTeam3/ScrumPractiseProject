import React from 'react'

// React-router-dom imports
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Component imports
import Hairmodel from './routes/Hairmodel'

function App() {
  return (
    <Router>
      <Route exact path="/hairmodel" component={Hairmodel} />
    </Router>
  )
}

export default App

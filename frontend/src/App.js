import React from 'react'

// React-router-dom imports
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Component imports
import HairModel from './routes/HairModel'
import HairModelAdmin from './routes/HairModelAdmin'
import HairdModelInfoAdmin from './routes/HairdModelInfoAdmin'

function App() {
  return (
    <Router>
      <Route exact path="/hairmodel" component={HairModel} />
      <Route exact path="/admin/hairmodel" component={HairModelAdmin} />
      <Route
        exact
        path="/admin/hairmodel/:id"
        component={HairdModelInfoAdmin}
      />
    </Router>
  )
}

export default App

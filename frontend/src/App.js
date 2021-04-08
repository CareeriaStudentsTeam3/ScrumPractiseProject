import React from 'react'

// React-router-dom imports
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Component imports
import Home from './routes/Home'
import HairModel from './routes/HairModel'
import HairModelAdmin from './routes/HairModelAdmin'
import HairdModelInfoAdmin from './routes/HairdModelInfoAdmin'
import Appointment from './routes/Appointment'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/hairmodel" component={HairModel} />
      <Route exact path="/admin/hairmodel" component={HairModelAdmin} />
      <Route
        exact
        path="/admin/hairmodel/:id"
        component={HairdModelInfoAdmin}
      />
      <Route exact path="/appointment" component={Appointment} />
    </Router>
  )
}

export default App

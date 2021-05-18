import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { fiFI } from '@material-ui/core/locale'

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#e3b716' },
      secondary: { main: '#e93e00' },
    },
  },
  fiFI
)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

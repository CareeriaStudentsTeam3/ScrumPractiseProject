import React, { useState } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Service import
import logoutService from '../../../services/logout'

// Material UI imports
import Button from '@material-ui/core/Button'

const LogoutButton = () => {
  const [redirect, setRedirect] = useState(false)

  const handleLogout = async () => {
    await logoutService.logout()
    window.localStorage.clear()
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <Button
      onClick={() => handleLogout()}
      variant="contained"
      color="primary"
      size="small"
      style={{ margin: '10px' }}
    >
      Kirjaudu ulos
    </Button>
  )
}

export default LogoutButton

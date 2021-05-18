import React from 'react'

// React-router-dom import
import { useHistory } from 'react-router-dom'

// Material UI imports
import Button from '@material-ui/core/Button'

const HomeButton = () => {
  let history = useHistory()

  const handleBackToMainPage = () => {
    history.push({
      pathname: '/',
    })
  }

  return (
    <Button
      data-testid="home-button"
      onClick={() => handleBackToMainPage()}
      color="primary"
      variant="contained"
      size="small"
      style={{ margin: '10px', marginLeft: '5px' }}
    >
      Palaa etusivulle
    </Button>
  )
}

export default HomeButton

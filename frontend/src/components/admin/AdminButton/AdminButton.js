import React from 'react'

// React-router-dom imports
import { useHistory } from 'react-router-dom'

// Material UI imports
import Button from '@material-ui/core/Button'

const AdminButton = () => {
  let history = useHistory()

  const handleClick = () => {
    history.push('/admin')
  }

  return (
    <Button onClick={() => handleClick()} variant="contained" color="primary">
      Palaa ylläpidon etusivulle
    </Button>
  )
}

export default AdminButton

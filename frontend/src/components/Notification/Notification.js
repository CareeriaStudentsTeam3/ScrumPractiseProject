import React from 'react'

// Material UI imports
import Snackbar from '@material-ui/core/Snackbar'

const Notification = ({ message, open }) => {
  if (message === null) {
    return null
  }

  if (message !== null) {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        message={message}
      />
    )
  }
}

export default Notification

import React from 'react'

// Material UI imports
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

const BreadcrumbsNav = ({ groupSize, service, time, handleNavClick }) => {
  if (groupSize !== null && service === null && time === null) {
    return (
      <Breadcrumbs>
        <Link
          color="inherit"
          component="button"
          onClick={() => handleNavClick('group')}
        >
          Ryhmän koko: {groupSize}
        </Link>
        <Typography color="textSecondary">Valitse palvelu</Typography>
      </Breadcrumbs>
    )
  }

  if (groupSize !== null && service !== null && time === null) {
    return (
      <Breadcrumbs>
        <Link
          color="inherit"
          component="button"
          onClick={() => handleNavClick('group')}
        >
          Ryhmän koko: {groupSize}
        </Link>
        <Link
          color="inherit"
          component="button"
          onClick={() => handleNavClick('service')}
        >
          Palvelu: {service}
        </Link>
        <Typography color="textSecondary">Valitse aika</Typography>
      </Breadcrumbs>
    )
  }

  if (groupSize !== null && service !== null && time !== null) {
    return (
      <Breadcrumbs>
        <Link
          color="inherit"
          component="button"
          onClick={() => handleNavClick('group')}
        >
          Ryhmän koko: {groupSize}
        </Link>
        <Link
          color="inherit"
          component="button"
          onClick={() => handleNavClick('service')}
        >
          Palvelu: {service}
        </Link>
        <Link
          color="inherit"
          component="button"
          onClick={() => handleNavClick('time')}
        >
          Aika: {time}
        </Link>
        <Typography color="textSecondary">Anna yhteystiedot</Typography>
      </Breadcrumbs>
    )
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="textSecondary">Valitse ryhmän koko</Typography>
    </Breadcrumbs>
  )
}

export default BreadcrumbsNav

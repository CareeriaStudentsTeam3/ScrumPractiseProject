/* eslint-disable indent */
import React, { useState, useEffect } from 'react'

// Material UI imports
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useHistory } from 'react-router'

const AppointmentList = ({ appointments }) => {
  let history = useHistory()
  console.log(appointments)
  const [filteredAppointments, setFilteredAppointments] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [filterNotConfirmed, setFilterNotConfirmed] = useState(false)

  const filterWithConfirmed = async () => {
    const filteredAppointments = appointments.filter((item) => {
      return item.confirmed !== true
    })
    console.log('filtered', filteredAppointments)
    setFilteredAppointments(filteredAppointments)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleAppointmentInfo = (id) => {
    history.push(`/admin/appointment/${id}`)
  }

  const handleChange = (event) => {
    setFilterNotConfirmed(event.target.checked)
  }

  useEffect(() => {
    filterWithConfirmed()
  }, [filterNotConfirmed])

  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Box minWidth="60%">
        <Box my={2}>
          <FormControlLabel
            label={
              filterNotConfirmed === false
                ? 'Näytä vahvistamattomat'
                : 'Näytä kaikki'
            }
            control={
              <Switch
                checked={filterNotConfirmed}
                onChange={handleChange}
                name="confirmed"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
          />
        </Box>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Yhteyshenkilö</TableCell>
                <TableCell>Päivämäärä</TableCell>
                <TableCell align="center">Tila</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterNotConfirmed
                ? (rowsPerPage > 0
                    ? filteredAppointments.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredAppointments
                  ).map((item) => (
                    <TableRow hover key={item.id}>
                      <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                      <TableCell>
                        {item.appointment_date !== null
                          ? `${item.time.time.beginning} - ${item.time.time.end}`
                          : 'lol'}
                      </TableCell>
                      {item.confirmed ? (
                        <TableCell align="center">Vahvistettu</TableCell>
                      ) : (
                        <TableCell align="center">Vahvistamatta</TableCell>
                      )}
                      <TableCell align="right">
                        <Button
                          onClick={() => handleAppointmentInfo(item.id)}
                          variant="contained"
                          color="primary"
                        >
                          Muokkaa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : (rowsPerPage > 0
                    ? appointments.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : appointments
                  ).map((item) => (
                    <TableRow hover key={item.id}>
                      <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                      <TableCell>
                        {item.appointment_date !== null
                          ? `${item.time.time.beginning} - ${item.time.time.end}`
                          : 'lol'}
                      </TableCell>
                      {item.confirmed ? (
                        <TableCell align="center">Vahvistettu</TableCell>
                      ) : (
                        <TableCell align="center">Vahvistamatta</TableCell>
                      )}
                      <TableCell align="right">
                        <Button
                          onClick={() => handleAppointmentInfo(item.id)}
                          variant="contained"
                          color="primary"
                        >
                          Muokkaa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default AppointmentList

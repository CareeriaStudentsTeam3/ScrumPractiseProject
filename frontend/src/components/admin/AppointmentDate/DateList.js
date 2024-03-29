/* eslint-disable indent */
import React, { useState } from 'react'

// Service import
import timespanService from '../../../services/timespan'

// Import utils
import { formatStartDate, formatEndDate } from '../../../utils/dateFuncs'

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

const DateList = ({
  dates,
  setCreateDate,
  handleDelete,
  setEditDate,
  setDate,
  user,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDateCreate = () => {
    setCreateDate(true)
  }

  const handleDateEdit = async (id) => {
    console.log('id', id)
    setEditDate(true)
    const response = await timespanService.getOne(id)
    console.log('editRes', response)
    setDate(response)
  }

  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Box minWidth="60%">
        {user && user.user_group[0] === 'student' ? null : (
          <Button
            onClick={() => handleDateCreate()}
            variant="contained"
            color="primary"
          >
            Luo uusi
          </Button>
        )}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Vapaa aika</TableCell>
                <TableCell align="center">Maksimi ryhmäkoko</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? dates.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dates
              ).map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{`${formatStartDate(
                    item.beginning
                  )} - ${formatEndDate(item.end)}`}</TableCell>
                  <TableCell align="center">{`${item.max_group_size} henkilöä`}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  {user && user.user_group[0] === 'student' ? (
                    <>
                      <TableCell></TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="right">
                        <Button
                          onClick={() => handleDateEdit(item.id)}
                          variant="contained"
                          color="primary"
                        >
                          Muokkaa
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="contained"
                          color="secondary"
                        >
                          Poista
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default DateList

/* eslint-disable indent */
import React, { useState } from 'react'

// Service import
import userService from '../../../services/user'

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

const UserList = ({
  users,
  user,
  handleDelete,
  setCreateUser,
  setOneUser,
  setEditUser,
}) => {
  console.log('user', user)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleServiceCreate = () => {
    setCreateUser(true)
  }

  const handleUserEdit = async (id) => {
    setEditUser(true)
    const response = await userService.getOne(id)
    setOneUser(response)
  }

  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Box minWidth="60%">
        <Button
          onClick={() => handleServiceCreate()}
          variant="contained"
          color="primary"
        >
          Luo uusi
        </Button>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nimi</TableCell>
                <TableCell>Käyttäjätunnus</TableCell>
                <TableCell>Ryhmä</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.groups}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUserEdit(item.id)}
                    >
                      Muokkaa
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Poista
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default UserList

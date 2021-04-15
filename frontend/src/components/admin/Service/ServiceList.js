/* eslint-disable indent */
import React, { useState } from 'react'

// Service import
import serviceService from '../../../services/service'

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
// import Typography from '@material-ui/core/Typography'

const ServiceList = ({
  services,
  setCreateService,
  handleDelete,
  setEditService,
  setService,
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

  const handleServiceCreate = () => {
    setCreateService(true)
  }

  const handleServiceEdit = async (id) => {
    setEditService(true)
    const response = await serviceService.getOne(id)
    setService(response)
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
                <TableCell>Palvelun nimi</TableCell>
                <TableCell>Kesto (min)</TableCell>
                <TableCell>Hinta</TableCell>
                <TableCell align="center">Maksimi ryhmäkoko</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? services.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : services
              ).map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{item.service_name}</TableCell>
                  <TableCell>{item.duration}min</TableCell>
                  <TableCell>{item.price}€</TableCell>
                  <TableCell align="center">{`${item.max_group_size} henkilöä`}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleServiceEdit(item.id)}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={services.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default ServiceList

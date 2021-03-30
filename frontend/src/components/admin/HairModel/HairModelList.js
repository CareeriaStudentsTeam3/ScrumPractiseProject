/* eslint-disable indent */
import React, { useState } from 'react'

// React-router-dom imports
import { useHistory } from 'react-router-dom'

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
import Typography from '@material-ui/core/Typography'

const HairModelList = ({ hairModels }) => {
  let history = useHistory()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleHairModelInfo = (id) => {
    history.push(`/admin/hairmodel/${id}`)
  }

  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Box minWidth="60%">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5">Hiusmallin nimi</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? hairModels.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : hairModels
              ).map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleHairModelInfo(item.id)}
                      variant="contained"
                      color="primary"
                    >
                      Tiedot
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
          count={hairModels.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default HairModelList

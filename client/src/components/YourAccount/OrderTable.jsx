import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { getServicesByIds } from '../../utils/servicesPage';

export default function OrderTable({ rows }) {
  // con este funcion, llamariamos a una ruta del back,
  // para mostrar esos servicios solos. (ya esta la ruta, func getServicesByIds)
  // Luego, podriamos hacer un modal, o ahi mismo
  // mostrar los servicios con el otro componente que estaba antes,
  // asi puede ir a ver el chat
  const handleClick = (services) => {
    getServicesByIds(services)
      .then((data) => console.log(data)) // aca ya te trae los servicios
      .catch((e) => console.log('algo fallo'));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='center'>Count Services</TableCell>
            <TableCell align='center'>Total</TableCell>
            <TableCell align='center'>Date</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='center'>{row.services.length}</TableCell>
              {/* Todavia no esta implementado, capaz lo sacamos */}
              <TableCell align='center'>${row.total}</TableCell>
              {/* Convertir la fecha */}
              <TableCell align='center'>{row.updatedAt}</TableCell>
              <TableCell
                align='right'
                sx={row.status === 'success' ? { color: 'green' } : null}
              >
                {row.status}
              </TableCell>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleClick(row.services)}
              >
                Show
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

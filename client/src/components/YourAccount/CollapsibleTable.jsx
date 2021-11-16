import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  querie: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-grid !important',
    },
  },
  btn: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(1) !important',
      // position: 'absolute !important',
      // left: '170px !important',
      // marginTop: '28px !important',
    },
    marginBottom: '5%',
  },
}));

export default function CollapsibleTable({ rows }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.btn}>
      <Table aria-label="collapsible table" className={classes.btn}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="center">Services</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            
          rows.sort(function(a,b){
                return b.id - a.id
                
          }).map((row) => (
            <Row key={`${row.id}_row`} row={row} />
          )) 
        }
  
        </TableBody>
      </Table>
    </TableContainer>
  );
}

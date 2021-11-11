import React, {  useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getServicesByIds } from "../../utils/servicesPage";
import Box from "@mui/material/Box";
import Orders from "./Orders/Orders";
import { Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function OrderTable({ rows }) {
  // con este funcion, llamariamos a una ruta del back,
  // para mostrar esos servicios solos. (ya esta la ruta, func getServicesByIds)
  // Luego, podriamos hacer un modal, o ahi mismo
  // mostrar los servicios con el otro componente que estaba antes,
  // asi puede ir a ver el chat


  const [servicesBought, setServicesBought] = useState([]);
  console.log(servicesBought);

  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState(null);


  const handleClick = (services, id) => {
    getServicesByIds(services)
      .then((data) => setServicesBought(data)) // aca ya te trae los servicios
      .catch((e) => console.log(e.message));

    setOrderId(id);
    setShow(!show);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: "5%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Count Services</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.services.length}</TableCell>
                {/* Todavia no esta implementado, capaz lo sacamos */}
                <TableCell align="center">${row.total}</TableCell>
                {/* Convertir la fecha */}
                <TableCell align="center">
                  {row.updatedAt.split("T")[0]}
                </TableCell>
                <TableCell
                  align="right"
                  sx={row.status === "success" ? { color: "green" } : null}
                >
                  {row.status}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    disableElevation
                    onClick={() => handleClick(row.services, row.id)}
                  >
                    Show
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {show && servicesBought.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems:'center', marginBottom:'1%' }}>
          <Typography variant="h6">Order {orderId}</Typography>
          <KeyboardArrowDownIcon />
        </Box>
      )}

      <Box>
        {show && servicesBought &&
          servicesBought.map((s) => (
            <Box sx={{ marginBottom: 5 }}>
              <Orders service={s} />
            </Box>
          ))}
      </Box>
    </>
  );
}

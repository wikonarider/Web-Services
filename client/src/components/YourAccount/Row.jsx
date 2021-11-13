import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Orders from "./Orders/Orders";
import { getServicesByIds } from "../../utils/servicesPage";

export default function Row({ row }) {
  const [open, setOpen] = useState(false);

  const [servicesBought, setServicesBought] = useState([]);
  console.log(servicesBought);

  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleClick = (services, id) => {
    getServicesByIds(services)
      .then((data) => setServicesBought(data)) // aca ya te trae los servicios
      .catch((e) => console.log(e.message));

    setOrderId(id);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              handleClick(row.services, row.id);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center">{row.services.length}</TableCell>
        <TableCell align="center">$ {row.total}</TableCell>
        <TableCell align="center">{row.updatedAt.split("T")[0]}</TableCell>
        <TableCell
          align="right"
          sx={row.status === "success" ? { color: "green" } : null}
        >
          {row.status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {servicesBought &&
                servicesBought.map((s, index) => (
                  <Box key={index} sx={{ marginBottom: '1%' }}>
                    <Orders service={s} />
                  </Box>
                ))}
            </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

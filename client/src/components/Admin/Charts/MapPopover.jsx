import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function MapPopover({ open, setOpen, info }) {
  info =
    open !== "" ? info.filter((p) => p["services.province.id"] === open) : info;
  let title = info ? info[0]["services.province.name"] : null;
  let totalServices = info
    ? info.reduce((p, c) => {
        return p + Number(c.n_services);
      }, 0)
    : null;

  return (
    open !== "" && (
      <Card
        sx={{
          width: "95%",
          height: "95%",
          zIndex: 1,
          position: "relative",
          m: "auto",
          opacity: 0.96,
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={() => setOpen("")}>
              <CloseIcon />
            </IconButton>
          }
          title={title}
          subheader={`Total services ${totalServices}`}
          sx={{ p: "5px 3px 3px 3px" }}
        />
        <CardContent sx={{ p: "3px" }}>
          <TableContainer>
            <Table stickyHeader size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Services</TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ p: "0px", overflow: "scroll" }}>
                {info.map((row) => (
                  <TableRow key={row.groupName}>
                    <TableCell scope="row">{row.groupName}</TableCell>
                    <TableCell align="right">
                      {(row.n_services / totalServices).toLocaleString(
                        undefined,
                        {
                          style: "percent",
                          minimumFractionDigits: 1,
                        }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    )
  );
}

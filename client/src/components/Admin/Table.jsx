import React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@mui/material/Switch";
import SearchBar from "./Controllers/SearchBar";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import { useJsonToCsv } from "react-json-csv";

const useStyles = makeStyles((theme) => ({
  showDialog: {
    [theme.breakpoints.up("lg")]: {
      display: "none !important",
    },
  },

  xs: {
    [theme.breakpoints.down("xs")]: {
      display: "none !important",
    },
  },
  md: {
    [theme.breakpoints.down("md")]: {
      display: "none !important",
    },
  },
  sm: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },

  dialog: {
    backgroundColor: "theme.palette.primary !important",
  },
}));

export default function TableAdmin({
  columns,
  url,
  putUrl,
  searchPlaceholder,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orderBy, setOrderBy] = React.useState({ order: "desc" });
  const [sortFx, setSortFx] = React.useState();
  const [info, setInfo] = React.useState();
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (!info || info.length === 0) {
      axios.get(url).then((response) => setInfo(response.data));
    }
  }, [info]);

  const { saveAsCsv } = useJsonToCsv();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, rowId, columnId) => {
    let currentSwitchValue = info.find((i) => rowId === i.id)[columnId];

    axios
      .put(putUrl, { serviceId: rowId, avaliable: `${!currentSwitchValue}` })
      .then((response) => {
        let modifiedIndex = info.findIndex((i) => i.id === rowId);
        let copyInfo = [...info];
        copyInfo[modifiedIndex].avaliable = !currentSwitchValue;
        setInfo(copyInfo);
      });
  };

  const recursiveColumns = (obj, referenceArr) => {
    if (referenceArr.length === 1) return obj[referenceArr[0]];

    return recursiveColumns(obj[referenceArr[0]], referenceArr.slice(1));
  };

  const sortHandler = (type, id) => {
    const sortOptions = {
      NUM: (a, b) => {
        if (a[id] === null) return 1;
        if (b[id] === null) return -1;
        return Number(a[id]) - Number(b[id]);
      },
      NUMd: (a, b) => {
        if (a[id] === null) return 1;
        if (b[id] === null) return -1;
        return Number(b[id]) - Number(a[id]);
      },
      AZ: (a, b) => {
        return a[id].localeCompare(b[id]);
      },
      AZd: (a, b) => {
        return b[id].localeCompare(a[id]);
      },
    };

    setOrderBy((orderBy) => {
      return { id: id, order: orderBy.order === "desc" ? "asc" : "desc" };
    });

    type = orderBy.order === "desc" ? type : type + "d";
    let infoCopy = [...info].sort(sortOptions[type]);

    setInfo(infoCopy);
    setPage(0);
  };

  const classes = useStyles();
  return info ? (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: "10px", mb: "40px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={`searchRowCell`} align="center" colSpan={5}>
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  setOpen={(val) => val}
                  setOptions={setInfo}
                  url={`${url}?search=`}
                  placeholder={searchPlaceholder}
                />
              </TableCell>
              <TableCell key="downloadCsvServices" align="right" colSpan={1}>
                <IconButton
                  onClick={() =>
                    saveAsCsv({
                      data: info.map((i) => ({
                        ...i,
                        rating: Number(i.rating),
                        price: Number(i.price),
                        title: i.title.split(",").join(" "),
                      })),
                      fields: {
                        id: "id",
                        title: "title",

                        price: "price",
                        createdAt: "createdAt",
                        userId: "userId",
                        rating: "rating",
                        avaliable: "available",
                        categoryID: "categoryId",
                        cat: "category",
                        groupID: "groupID",
                        grp: "group",
                        provinceId: "provinceId",
                        prov: "province",
                        cityId: "cityId",
                        cty: "city",
                      },
                      filename: "services-csv",
                    })
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={`column-${column.label}`}
                  align="center"
                  style={{ width: column.width }}
                  className={classes[column.screenHide]}
                >
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy && orderBy.id === column.id}
                      hideSortIcon
                      direction={orderBy.order}
                      onClick={() => sortHandler(column.sort, column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {info
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = recursiveColumns(row, column.id.split("."));
                      return (
                        <TableCell
                          key={`${column.id}-${row.id}`}
                          align={column.align}
                          style={{
                            maxWidth: column.width,
                            padding: "4px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          className={classes[column.screenHide]}
                        >
                          {column.link ? (
                            <IconButton href={`${column.link}${row.id}`}>
                              <OpenInNewIcon />
                            </IconButton>
                          ) : null}
                          {column.switch ? (
                            <Switch
                              checked={
                                info &&
                                info.find((i) => row.id === i.id)[column.id]
                              }
                              onClick={(e) => handleClick(e, row.id, column.id)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          ) : column.format ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100, info.length]}
        component="div"
        count={info.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  ) : null;
}

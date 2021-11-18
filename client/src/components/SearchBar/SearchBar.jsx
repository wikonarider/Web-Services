import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjGlobal } from "../../redux/actions/index";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./SearchBar.module.css";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function SearchBar() {
  const objGlobal = useSelector((state) => state.objGlobal);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const obj = {
      ...objGlobal,
      title: name,
    };
    dispatch(setObjGlobal(obj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <Search
      sx={{ backgroundColor: "transparent" }}
      className={styles.searchBox}
    >
      <SearchIconWrapper sx={{ backgroundColor: "transparent" }}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        className={`${name ? styles.searchInputWithValue : styles.searchInput}`}
        value={name}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setName(e.target.value)}
      />
    </Search>
  );
}

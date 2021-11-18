import React from "react";
import axios from "axios";

import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function SearchBar({
  search,
  setSearch,
  setOptions,
  setOpen,
  url,
}) {
  const handleInputChange = (event, setSearch, setOptions) => {
    let value = event.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      setOptions([]);
    } else {
      axios.get(`${url}${value}`).then((response) => setOptions(response.data));
    }
  };

  const handleClearInput = (setSearch, setOptions, setOpen) => {
    setSearch("");
    setOptions([]);
    setOpen(false);
  };

  return (
    <>
      <OutlinedInput
        fullWidth
        id={"user-search"}
        value={search}
        placeholder="Search ID, Name, Username, Email"
        onClick={() => setOpen(true)}
        onChange={(e) => handleInputChange(e, setSearch, setOptions)}
        autoComplete="off"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleClearInput(setSearch, setOptions, setOpen)}
              aria-label="clear search"
              edge="end"
            >
              {search !== "" && <CloseIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
}

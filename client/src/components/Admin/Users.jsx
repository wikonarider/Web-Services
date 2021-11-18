import React, { useState } from "react";
import SearchBar from "./Controllers/SearchBar";
import Results from "./Controllers/Results";
import Box from "@mui/material/Box";
export default function Users() {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  return (
    <Box sx={{ width: "90%", m: "10px auto" }}>
      <SearchBar
        setOpen={setOpen}
        search={search}
        setSearch={setSearch}
        setOptions={setOptions}
        url={`/users/search?search=`}
        placeholder="Search ID, Name, Username, Email"
      />
      <Results
        search={search}
        options={options}
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
        setOptions={setOptions}
      />
      {selected.map((user) => (
        <h1>{user.name}</h1>
      ))}
    </Box>
  );
}

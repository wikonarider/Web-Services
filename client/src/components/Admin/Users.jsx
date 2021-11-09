import React, { useState } from "react";
import SearchBar from "./Controllers/SearchBar";
import Results from "./Controllers/Results";

export default function Users() {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  return (
    <>
      <h1>Users - Admin Panel</h1>
      <SearchBar
        setOpen={setOpen}
        search={search}
        setSearch={setSearch}
        setOptions={setOptions}
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
    </>
  );
}

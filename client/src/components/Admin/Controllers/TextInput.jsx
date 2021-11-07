import * as React from "react";

import TextField from "@mui/material/TextField";

export default function TextInput({ defaultValue }) {
  return (
    <TextField
      id="outlined-size-small"
      defaultValue={defaultValue}
      size="small"
    />
  );
}

import React from "react";
import Input from "@mui/material/Input";
export default function TextInput({
  defaultValue,
  setEdit,
  edit,
  optionId,
  optionProp,
}) {
  const handleChange = (event, id) => {
    let value = event.target.value;
    setEdit((edit) => {
      return { ...edit, [id]: { ...edit[id], [optionProp]: value } };
    });
  };

  return (
    <Input
      id="outlined-size-small"
      placeholder={defaultValue}
      autoComplete="off"
      size="small"
      sx={{ width: `${(defaultValue.length + 1) * 8}px`, ml: "10px" }}
      onChange={(e) => handleChange(e, optionId)}
      value={edit[optionId][optionProp]}
    />
  );
}

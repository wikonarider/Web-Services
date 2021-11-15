import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({
  id,
  defaultValue, //Estado React o Redux
  handleChange, //Funcion para el evento onChange (Cuando se selecciona un valor)
  valuesArr, //Array con los elementos a mostrar en la lista
  label,
  formHelperText,
}) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`select-label-${id}`}>{label}</InputLabel>
        <Select
          labelId={`select-label-${id}`}
          id={`select-${id}`}
          value={defaultValue}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Clear</em>
          </MenuItem>
          {valuesArr &&
            valuesArr.map((v) => {
              return (
                <MenuItem key={`select-op-${id}-${v}`} value={v}>
                  {v}
                </MenuItem>
              );
            })}
        </Select>
        <FormHelperText>{formHelperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

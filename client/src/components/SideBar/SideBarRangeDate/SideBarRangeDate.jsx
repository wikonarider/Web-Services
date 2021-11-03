import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjGlobal } from "../../../redux/actions/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

export default function SideBarRangeDate({ text, index }) {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);

  const [rangeDate, setRangeDate] = useState({
    ascending: false,
    descending: false,
  });

  useEffect(() => {
    if (objGlobal.order === "date") {
      if (objGlobal.type === "ASC") {
        setRangeDate({
          descending: false,
          ascending: true,
        });
      } else {
        setRangeDate({
          descending: true,
          ascending: false,
        });
      }
    } else {
      setRangeDate({
        descending: false,
        ascending: false,
      });
    }
  }, [objGlobal]);

  const handleChangeCheck = (event) => {
    let obj = {
      ...objGlobal,
      order: event.target.name,
      type: event.target.value,
    };
    dispatch(setObjGlobal(obj));

    if (event.target.value === "ASC") {
      setRangeDate({
        descending: false,
        ascending: true,
      });
    }
    if (event.target.value === "DESC") {
      setRangeDate({
        descending: true,
        ascending: false,
      });
    }
  };

  return (
    <List>
      <ListItem button key={index}>
        <ListItemText primary={text} />
        <FormControlLabel
          name="date"
          value="ASC"
          control={<Checkbox />}
          label="asc"
          labelPlacement="top"
          checked={rangeDate.ascending}
          onChange={handleChangeCheck}
        />
        <FormControlLabel
          name="date"
          value="DESC"
          control={<Checkbox />}
          label="des"
          labelPlacement="top"
          checked={rangeDate.descending}
          onChange={handleChangeCheck}
        />
      </ListItem>
    </List>
  );
}

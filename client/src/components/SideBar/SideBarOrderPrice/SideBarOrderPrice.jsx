import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjGlobal } from "../../../redux/actions/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

export default function SideBarOrderPrice({ text, index }) {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);

  const [rangePrice, setRangePrice] = useState({
    ascending: false,
    descending: false,
  });

  useEffect(() => {
    if (objGlobal.order === "price") {
      if (objGlobal.type === "ASC") {
        setRangePrice({
          descending: false,
          ascending: true,
        });
      } else {
        setRangePrice({
          descending: true,
          ascending: false,
        });
      }
    } else {
      setRangePrice({
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
      setRangePrice({
        descending: false,
        ascending: true,
      });
    }
    if (event.target.value === "DESC") {
      setRangePrice({
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
          name="price"
          value="ASC"
          control={<Checkbox />}
          label="asc"
          labelPlacement="top"
          checked={rangePrice.ascending}
          onChange={handleChangeCheck}
        />
        <FormControlLabel
          name="price"
          value="DESC"
          control={<Checkbox />}
          label="desc"
          labelPlacement="top"
          checked={rangePrice.descending}
          onChange={handleChangeCheck}
        />
      </ListItem>
    </List>
  );
}

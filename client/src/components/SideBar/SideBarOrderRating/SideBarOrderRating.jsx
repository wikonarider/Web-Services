import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjGlobal } from "../../../redux/actions/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

export default function SideBarOrderRating({ text, index }) {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);

  const [orderRating, setOrderRating] = useState({
    ascending: false,
    descending: false,
  });

  useEffect(() => {
    if (objGlobal.order === "rating") {
      if (objGlobal.type === "ASC") {
        setOrderRating({
          descending: false,
          ascending: true,
        });
      } else {
        setOrderRating({
          descending: true,
          ascending: false,
        });
      }
    } else {
      setOrderRating({
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
      setOrderRating({
        descending: false,
        ascending: true,
      });
    }
    if (event.target.value === "DESC") {
      setOrderRating({
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
          name="rating"
          value="ASC"
          control={<Checkbox />}
          label="asc"
          labelPlacement="top"
          checked={orderRating.ascending}
          onChange={handleChangeCheck}
        />
        <FormControlLabel
          name="rating"
          value="DESC"
          control={<Checkbox />}
          label="desc"
          labelPlacement="top"
          checked={orderRating.descending}
          onChange={handleChangeCheck}
        />
      </ListItem>
    </List>
  );
}

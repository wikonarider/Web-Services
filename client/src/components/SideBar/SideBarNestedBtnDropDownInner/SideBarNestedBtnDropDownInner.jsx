import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { setObjGlobal } from "../../../redux/actions";

export default function SideBarNestedBtnDropDownInner({ name }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);

  // para dejarlo prendido cuando se cierra y abre denuevo
  useEffect(() => {
    let index = objGlobal.category.indexOf(name);
    if (index !== -1) {
      setChecked(() => true);
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = () => {
    if (checked === false) {
      // armo el obj del estado de redux
      const obj = {
        ...objGlobal,
        category: [...objGlobal.category, name],
      };
      // lo despacho
      dispatch(setObjGlobal(obj));
    }

    if (checked === true) {
      let index = objGlobal.category.indexOf(name);
      if (index > -1) {
        let category = [...objGlobal.category];
        category.splice(index, 1);
        let obj = {
          ...objGlobal,
          category: category,
        };
        dispatch(setObjGlobal(obj));
      }
    }
    setChecked((prev) => !prev);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} name={name} onChange={handleChange} />
      }
      label={name}
    />
  );
}

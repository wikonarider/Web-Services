import * as React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFilters, getServices} from "../../../redux/actions";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { privateEncrypt } from 'crypto';

export default function SideBarNestedBtnDropDownInner({ name }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch()
  const obj = {
    category : name,
    order : "ASC",
    filter : "price",
  }
  const handleChange = () => {
    setChecked(!checked);
    dispatch(getServices(obj))
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

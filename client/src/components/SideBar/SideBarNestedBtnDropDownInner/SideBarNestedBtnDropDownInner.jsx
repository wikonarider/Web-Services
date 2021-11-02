import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters, getServices, postCategory } from '../../../redux/actions';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { privateEncrypt } from 'crypto';

export default function SideBarNestedBtnDropDownInner({ name }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const objState = useSelector((state) => state.objGlobal);
console.log(objState)

 

  const handleChange = () => {
    console.log(objState)
    if (checked === false) {
      objState.category.push(name)  }
    if (checked === true) {
      var index = objState.category.indexOf(name);
      if (index > -1) {
        objState.category.splice(index, 1);
      } 
    }
    setChecked(!checked);
    dispatch(getServices(objState));
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

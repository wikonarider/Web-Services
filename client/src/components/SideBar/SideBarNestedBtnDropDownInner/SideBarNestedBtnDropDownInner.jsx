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
  const obj = {
    category: allCategories,
    order: 'ASC',
    filter: 'price',
  };

 

  const handleChange = () => {
    if (checked === false) {
      allCategories.push(name)  }
    if (checked === true) {
      var index = allCategories.indexOf(name);
      if (index > -1) {
        allCategories.splice(index, 1);
      } 
    }
    setChecked(!checked);
    dispatch(postCategory(allCategories));
    dispatch(getServices(obj));
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

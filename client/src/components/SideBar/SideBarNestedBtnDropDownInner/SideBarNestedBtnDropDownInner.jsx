import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilters, getServices, postCategory } from '../../../redux/actions';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { privateEncrypt } from 'crypto';

export default function SideBarNestedBtnDropDownInner({ name }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const obj = {
    category: "",
    order: 'ASC',
    filter: 'price',
  };

if(checked === false){
 obj.category = name
}
if(checked === true){
obj.category = ""
}

  const handleChange = () => {
    setChecked(!checked);

    dispatch(postCategory(name));
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

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getServices } from '../../../redux/actions';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

export default function SideBarOrderPrice({ text, index }) {
  const dispatch = useDispatch();
  const objState = useSelector((state) => state.objGlobal);

  const [rangePrice, setRangePrice] = useState({
    ascending: true,
    descending: false,
  });

  //dispatcho el objeto que necesita db con allCategories que refiere a la categorí tildad en checkbox de sub-grupos
  const handleChangeCheck = (event) => {
    
      objState.order = event.target.value
      objState.filter = 'price'
    

    if (event.target.name === 'ascending') {
      setRangePrice({
        descending: false,
        [event.target.name]: event.target.checked,
      });
    }
    if (event.target.name === 'descending') {
      setRangePrice({
        ascending: false,
        [event.target.name]: event.target.checked,
      });
    }
   console.log(objState)
    dispatch(getServices(objState));
  };

  return (
    <List>
      <ListItem button key={index}>
        <ListItemText primary={text} />
        <FormControlLabel
          name="ascending"
          value="ASC"
          control={<Checkbox />}
          label="asc"
          labelPlacement="top"
          checked={rangePrice.ascending}
          onChange={handleChangeCheck}
        />
        <FormControlLabel
          name="descending"
          value="DESC"
          control={<Checkbox />}
          label="des"
          labelPlacement="top"
          checked={rangePrice.descending}
          onChange={handleChangeCheck}
        />
      </ListItem>
    </List>
  );
}

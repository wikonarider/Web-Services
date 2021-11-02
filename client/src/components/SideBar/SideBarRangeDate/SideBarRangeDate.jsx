import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getServices } from '../../../redux/actions';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

export default function SideBarRangeDate({ text, index }) {
  const dispatch = useDispatch();
  const objState = useSelector((state) => state.objGlobal);

  const [rangeDate, setRangeDate] = useState({
    ascending: true,
    descending: false,
  });

  const handleChangeCheck = (event) => {
      objState.order = event.target.value
      objState.filter = 'created'

    if (event.target.name === 'ascending') {
      setRangeDate({
        descending: false,
        [event.target.name]: event.target.checked,
      });
    }
    if (event.target.name === 'descending') {
      setRangeDate({
        ascending: false,
        [event.target.name]: event.target.checked,
      });
    }

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
          checked={rangeDate.ascending}
          onChange={handleChangeCheck}
        />
        <FormControlLabel
          name="descending"
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

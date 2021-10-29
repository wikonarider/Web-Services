import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SideBarNestedBtnDropDown from '../SideBarNestedBtnDropDown/SideBarNestedBtnDropDown';
import { getGroups } from '../../../redux/actions';

import List from '@mui/material/List';

export default function SideBarNested({ openFromFather }) {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {allGroups.map((group, index) => {
        return (
          <SideBarNestedBtnDropDown
            key={index}
            openFromFather={openFromFather}
            group={group}
          />
        );
      })}
    </List>
  );
}

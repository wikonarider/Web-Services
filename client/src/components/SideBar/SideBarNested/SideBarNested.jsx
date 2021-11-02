import React from 'react';
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
    // eslint-disable-next-line
  }, []);

  return (
    <List
      sx={{
        width: '100%',
        minWidth: 360,
        bgcolor: 'background.paper',
        mt: '75px',
      }}
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

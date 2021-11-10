import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { putDark } from '../../redux/actions';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Brightness2TwoToneIcon from '@mui/icons-material/Brightness2TwoTone';

export default function DarkMode() {
  const darkGlobal = useSelector((state) => state.darkTheme);
  const dispatch = useDispatch();

  const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

  const setDark = () => {
    dispatch(putDark(!darkGlobal));
    localStorage.setItem('darkMode', !darkGlobal);
  };

  return (
    <FormControlLabel
      value="end"
      control={
        <PinkSwitch
          color="default"
          onClick={setDark}
          checked={darkGlobal}
          sx={{ ml: '1.5rem' }}
        />
      }
      label={<Brightness2TwoToneIcon />}
      labelPlacement="end"
    />
  );
}

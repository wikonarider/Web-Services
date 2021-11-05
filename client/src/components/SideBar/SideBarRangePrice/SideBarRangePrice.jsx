import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setObjGlobal } from '../../../redux/actions/index';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';

export default function SideBarRangePrice() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const [rangePrice, setRangePrice] = useState({
    startRange: '',
    endRange: '',
  });

  useEffect(() => {
    if (objGlobal.startRange && objGlobal.endRange) {
      setRangePrice({
        startRange: objGlobal.startRange,
        endRange: objGlobal.endRange,
      });
    } else {
      setRangePrice({
        startRange: '',
        endRange: '',
      });
    }
  }, [objGlobal]);

  const handleMinMaxChange = (event) => {
    if (event.target.id === 'startRange') {
      setRangePrice({
        ...rangePrice,
        [event.target.id]: Number(event.target.value),
      });
    }
    if (event.target.id === 'endRange') {
      setRangePrice({
        ...rangePrice,
        [event.target.id]: Number(event.target.value),
      });
    }
  };

  const handleBtn = () => {
    let obj = {
      ...objGlobal,
      startRange: rangePrice.startRange,
      endRange: rangePrice.endRange,
    };

    if (rangePrice.startRange < rangePrice.endRange) {
      dispatch(setObjGlobal(obj));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField
        required
        id="startRange"
        label="Minimum price"
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onChange={handleMinMaxChange}
        value={rangePrice.startRange}
      />
      <TextField
        required
        id="endRange"
        label="Maximum price"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onChange={handleMinMaxChange}
        value={rangePrice.endRange}
      />
      <Button
        variant="outlined"
        endIcon={<ArrowRightIcon />}
        onClick={handleBtn}
        color="secondary"
      >
        Search
      </Button>
    </Box>
  );
}

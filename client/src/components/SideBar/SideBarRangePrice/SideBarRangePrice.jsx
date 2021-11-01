import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getServices } from '../../../redux/actions';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';

export default function SideBarRangePrice() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const allServices = useSelector((state) => state.services);

  const [rangePrice, setRangePrice] = useState({
    startRange: '',
    endRange: '',
  });

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
      category: allCategories,
      order: 'ASC',
      filter: 'price',
      startRange: rangePrice.startRange,
      endRange: rangePrice.endRange,
    };

    if (rangePrice.startRange < rangePrice.endRange) {
      // console.log(obj);
      dispatch(getServices(obj));
      setRangePrice({
        startRange: '',
        endRange: '',
      });
    }
  };

  // console.log(allServices)

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
      >
        Search
      </Button>
    </Box>
  );
}

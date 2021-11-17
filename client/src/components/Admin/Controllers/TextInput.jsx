import React from 'react';
import Input from '@mui/material/Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  querie: {
    [theme.breakpoints.down('md')]: {
      width: '20rem !important',
    },
  },
}));

export default function TextInput({
  defaultValue,
  setEdit,
  edit,
  optionId,
  optionProp,
}) {
  const handleChange = (event, id) => {
    let value = event.target.value;
    setEdit((edit) => {
      return { ...edit, [id]: { ...edit[id], [optionProp]: value } };
    });
  };

  const classes = useStyles();

  return (
    <Input
      id="outlined-size-small"
      placeholder={defaultValue}
      autoComplete="off"
      size="small"
      sx={{ width: `${(defaultValue.length + 1) * 8}px`, ml: '10px' }}
      onChange={(e) => handleChange(e, optionId)}
      value={edit[optionId][optionProp]}
      className={classes.querie}
    />
  );
}

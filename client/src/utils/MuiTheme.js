import { createTheme } from '@mui/material';
import {
  blueGrey,
  brown,
  amber,
  lime,
  deepOrange,
  green,
} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F6D7A',
      contrastText: brown[500],
    },
    secondary: {
      main: lime[500],
      contrastText: brown[500],
    },
    error: deepOrange,
    warning: amber,
    succcess: green,
  },
});

export default theme;

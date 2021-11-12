import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardService from '../../CardService/CardService';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  querie: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100% !important',
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center !important',
    },
  },
}));

export default function RelatedServices({ related }) {
  const classes = useStyles();

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      p={1}
      maxWidth="80%"
      m="0px auto"
      className={classes.querie}
    >
      <Box gridColumn="span 12" p={2}>
        <Typography
          variant="h6"
          textAlign="left"
          sx={{ marginBottom: '2%' }}
          className={classes.title}
        >
          Related Services
        </Typography>

        {related &&
          (related.length > 0 ? (
            <Grid container justifyContent="flex-start" spacing={1.5}>
              {related.map((s) => (
                <Grid item key={s.id}>
                  <CardService service={s} related={true} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>Loading...</p>
          ))}
      </Box>
    </Box>
  );
}

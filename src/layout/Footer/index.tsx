import type { FC } from 'react';
import { Box, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    root: {
      background: '#09357B',
      minHeight:243,
      margin: -10
    }
  }
});

const Footer: FC= ()  => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}></Box>
  );
};

export default Footer;

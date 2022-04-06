import React from 'react';
import type { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import type { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      alignItems: 'center',
      backgroundColor: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      padding: theme.spacing(3),
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000
    }
  }
});

const SlashScreen: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Box width={100}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default SlashScreen;

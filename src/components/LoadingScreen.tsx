import { useEffect } from 'react';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress, Theme} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: theme.spacing(3),
      width: '100%'
    },
    container: {
      width: 100,
      maxWidth: '100%'
    },
  }
});

interface LoadingScreenProps {
  height?: number;
}

const LoadingScreen: FC<LoadingScreenProps> = ({height}) => {
  const { classes } = useStyles();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={classes.root} style={{minHeight: height}}>
      <Box className={classes.container}>
        <CircularProgress sx={{color: "#09357B", height: "80px !important", width: "80px !important"}}/>
      </Box>
    </div>
  );
};

LoadingScreen.propTypes = {
  height: PropTypes.number
}

export default LoadingScreen;

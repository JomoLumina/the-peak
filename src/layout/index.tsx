import type { FC } from 'react';
import { Container, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Box } from '@mui/system';
import TopBar from './TopBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      background: theme.palette.common.white,
      display: 'flex',
      height: '100%',
      width: '100%',
      padding: 0,
      flexDirection: "column"
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: theme.spacing(16.5)
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingBottom: theme.spacing(16.5)

    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto'
    }
  }
});

const Layout: FC = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Container className={classes.root}>
        <TopBar />
        <Box className={classes.wrapper}>
          <Box className={classes.contentContainer}>
            <Box className={classes.content}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
    
  );
};

export default Layout;

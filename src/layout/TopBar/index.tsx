import type { FC } from 'react';
import { AppBar, Toolbar, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Logo from '../../components/Logo';
import Search from '../../components/Search';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    root: {
      zIndex: theme.zIndex.drawer + 100,
      background: '#09357B',
    },
    toolbar: {
      maxWidth: 1200,
      margin: 'auto',
      width: 'calc(100% - 80px)',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: "center"
      }
    },
    search: {
      color: theme.palette.common.white,
      padding: 10,
      lineHeight: 1
    }
  }
});

const TopBar: FC= ()  => {
  const { classes } = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Logo />
        <Search />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;



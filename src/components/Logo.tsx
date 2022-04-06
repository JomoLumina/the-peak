import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { LogoImg } from '../assets';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
        display: 'flex',
    },
    logo:{
      maxWidth: theme.spacing(16),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    }
  }
});

const Logo: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={LogoImg} alt="the peaks logo" className={classes.logo}/>
      </Link>
    </div>
  );
};

export default Logo;
import { FC } from 'react';
import { Box, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Bookmark as AddBookmarkIcon, 
         BookmarkBorderRounded as RemoveBookmarkIcon 
} from '@mui/icons-material';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      zIndex: theme.zIndex.drawer + 100,
      position: 'fixed',
      bottom: 0,
      left:0,
      right:0,
      lineHeight: '35px',
      display: 'flex',
      color: '#FFFFFF',
      FontFamily: 'Roboto',
      justifyContent: 'center',
      textTransform: 'uppercase',
      transition: 'all 200ms ease-in-out'
    },
    icon:{
      position: 'relative',
      top: 5,
    }
  }
});

interface NotificationProps {
  type: string,
  height: number
}

const Notification: FC<NotificationProps> = ({ type, height }) => {
  const { classes } = useStyles();
  
  return (
  <Box className={classes.root} style={{height: height, background: type === 'added' ? '#388E3C' : '#D32F2F'}}>
    <Typography>
      {type === 'added' && <><AddBookmarkIcon className={classes.icon}/> Added to bookmark</>}
      {type === 'removed' && <><RemoveBookmarkIcon className={classes.icon}/> Removed from bookmark</>}
    </Typography>
    
  </Box>
  );
};

export default Notification;
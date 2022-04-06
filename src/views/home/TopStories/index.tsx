import {useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Container, Box, Typography, Button, 
  FormControl, InputLabel, MenuItem, Theme 
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from 'tss-react/mui';
import { Bookmark as BookmarkIcon } from '@mui/icons-material';
import { CardsContainer } from './CardsContainer';
import { newest, SortOrderList } from '../../../constants';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    root: {
      background: theme.palette.common.white,
      [theme.breakpoints.up('lg')]: {
        padding: 0
      }
    },
    header:{
      display: 'flex',
      position: 'relative',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]:{
        justifyContent: 'center',
        marginTop: theme.spacing(6)
      }
    },
    headerItems: {
      display: 'flex',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    title: {
      display: 'flex',
      fontFamily: 'georgia',
      fontWeight: 700,
      fontSize: theme.spacing(6),
      lineHeight: theme.spacing(6.125),
      color: 'rgba(0,0,0,0.87)',
      marginRight: theme.spacing(4),
      alignItems: 'flex-end'
    },
    bookmarkButton:{
      position: 'relative',
      top: 3,
      padding: theme.spacing(2),
      height: theme.spacing(4.5),
      background: '#09357B',
      color: theme.palette.common.white,
      margin: theme.spacing(1),
      
      fontSize: 13,
      lineHeight: 1,
      '&:hover':{
        background: 'rgba(9,53,123,0.8)'
      },
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(2,1)
      }
    },
    sortDropdown: {
      minWidth: theme.spacing(32),
      margin: theme.spacing(0, 1)
    },
    cardsContainer: {
      position: 'relative'
    }
  }
});

const TopStories: FC= ()  => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<string>(newest.value);

  const handleChange = (e: SelectChangeEvent) => {
    setSortOrder(e.target.value);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    navigate("/bookmarks");
  }
  
  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h2" className={classes.title}>Top stories</Typography>
        <Box className={classes.headerItems}>
          <Button 
            startIcon={<BookmarkIcon />}
            className={classes.bookmarkButton}
            onClick={handleClick}>
            View Bookmarks
          </Button>
          <FormControl variant="standard" sx={{ ml: 1, mr: 1, minWidth: 255 }}>
          <InputLabel id="sort-order-label">Order by</InputLabel>
          <Select
            labelId="sort-order-label"
            id="sort-order"
            value={sortOrder}
            label="Order by"
            onChange={handleChange}>
            {SortOrderList.map((sol) => 
              <MenuItem key={sol.value} value={sol.value}>{sol.label}</MenuItem>
            )}
          </Select>
        </FormControl>
        </Box>
      </Box>
      <Box className={classes.cardsContainer} mt={4}>
        <CardsContainer orderBy={sortOrder}/>
      </Box>
    </Container>
  );
};

export default TopStories;

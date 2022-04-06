import { FC,  useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, Button, Container, FormControl, InputLabel, MenuItem, 
  Select, SelectChangeEvent, Theme, Typography, useMediaQuery, useTheme 
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import LoadingScreen from '../../components/LoadingScreen';
import { newest, SortOrderList } from '../../constants';
import LoadArticles from '../../components/LoadArticle';
import { NoResultsImg } from '../../assets';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    root: {
      padding: 0,
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
      fontSize: theme.spacing(4),
      lineHeight: 1,
      color: 'rgba(0,0,0,0.87)',
      marginRight: theme.spacing(4),
      alignItems: 'flex-end'
    },
    image: {
      maxWidth: '100%',
      width: 360,
      maxHeight: 300,
      height: 'auto'
    },
    button:{
      color: "#09357B"
    },
    cardsContainer: {
      position: 'relative'
    },
    mdDownCard: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: '1 1 auto',
      [theme.breakpoints.down('md')]: {
        flex: 'initial',
        justifyContent: 'center',
        marginRight: theme.spacing(1)
      }
    },
    mdDownRow: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mdDownColumn: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      justifyContent: 'center',
    }
  }
});

const AllBookmark: FC = ()  => {
  const { classes } = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortOrder, setSortOrder] = useState<string>(newest.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookMarkedArticles, setBookMarkedArticles] = useState<any | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const bookMarkedArticlesJSON = localStorage.getItem("bookmarked-articles");
    if(bookMarkedArticlesJSON){
      setBookMarkedArticles(JSON.parse(bookMarkedArticlesJSON));
    }
    setIsLoading(false)
  },[])
  
  const handleChange = (e: SelectChangeEvent) => {
    setSortOrder(e.target.value);
    
    if(e.target.value === newest.value){
      bookMarkedArticles.sort(
        (a:any,b:any) => 
          new Date(b.webPublicationDate).getTime() - new Date(a.webPublicationDate).getTime());
    } else {
      bookMarkedArticles.sort(
        (a:any,b:any) => 
          new Date(a.webPublicationDate).getTime() - new Date(b.webPublicationDate).getTime());

    }

    setBookMarkedArticles(bookMarkedArticles);
  }

  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h4" className={classes.title}>{'All bookmark'}</Typography>
        <Box className={classes.headerItems}>
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
        {isLoading && <LoadingScreen />}
        {(!isLoading && bookMarkedArticles) &&
            <Box className={classes.mdDownRow}>
              <Box mb={4} className={classes.mdDownCard}>
                <LoadArticles 
                  articles={bookMarkedArticles} 
                  maxWidth={380} 
                  height={345} 
                  hasImage
                  hasBody
                  resize
                  className={classes.mdDownCard} />
              </Box>
            </Box>}
            {(!isLoading && !bookMarkedArticles) &&
            <Box className={classes.mdDownColumn}>
              <Typography
                align="center"
                variant={mobileDevice ? 'h5' : 'h4'}
                color="textPrimary">
                Oops, No bookmarks found
              </Typography>
              <Typography
                align="center"
                variant="subtitle2"
                color="textSecondary">
                  Add bookmarks using the add bookmark button on the article.
              </Typography>
              <Box
                mt={2}
                display="flex"
                justifyContent="center">
                <img
                  alt="Under development"
                  className={classes.image}
                  src={NoResultsImg}
                />
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="center">
                <Button
                  className={classes.button}
                  component={RouterLink}
                  to="/"
                  variant="outlined">
                  Back to home
                </Button>
              </Box>
            </Box>}
      </Box>
    </Container>
  );
};

export default AllBookmark;

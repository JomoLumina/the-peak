import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, 
  MenuItem, Select, SelectChangeEvent, Theme, Typography 
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Bookmark as BookmarkIcon } from '@mui/icons-material';
import GuardianAPI from '../../lib/GuardianAPI';
import LoadingScreen from '../../components/LoadingScreen';
import InfiniteLoadArticles from '../../components/InfiniteLoadArticles';
import { newest, SortOrderList } from '../../constants';
import { useNavigate } from 'react-router-dom';

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
    }
  }
});

interface SearchResultsProps {
  query?: string;
  heading: string;
}

const SearchResults: FC<SearchResultsProps> = ({query, heading})  => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [response, setResponse] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>(newest.value);
    const [params, setParams] = useState({type: "article",
                                          section: 'news',
                                          q:query,
                                          page: 1,
                                          "show-elements": "all",
                                          "show-fields": 'bodyText,thumbnail',
                                          "page-size":15,
                                          "order-by": "newest"
                                        });
    
    const handleChange = (e: SelectChangeEvent) => {
      setSortOrder(e.target.value);
      setParams(p => ({
        ...p,
        'order-by': e.target.value
      }))
    }
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>):void => {
      e.preventDefault();
      navigate("/bookmarks");
    }
  
    const fetchArticles = useCallback((): void => {
      GuardianAPI("search", {params}).then((res) => {
        if(res.data.response.results){
          setResponse(res.data.response);
        }
        setIsLoading(false);
      }).catch((error) =>{
          console.error(error);
          setIsLoading(false);
      });
    },[params]);

    
    const delaySearch = (_query: string) => {
      setParams(p => ({...p,q: _query}))
    }

  
    useEffect(() => {
      if(query){
        let delayTimer:any = {};
        setIsLoading(true);
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => delaySearch(query), 2000);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query])


    useEffect(() => {
      setIsLoading(false);
    },[params]);

    useEffect(() => {
      setIsLoading(true);
      fetchArticles(); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchArticles]);
  
  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h4" className={classes.title}>{heading}</Typography>
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
        {isLoading && <LoadingScreen />}
        {(!isLoading && response) &&
            <Box className={classes.mdDownRow}>
            {response.results && 
              <Box mb={4} className={classes.mdDownCard}>
                <InfiniteLoadArticles 
                  articles={response.results} 
                  maxWidth={380} 
                  height={345} 
                  hasImage
                  hasBody
                  hasMore={!(response.currentPage >= response.pages)}
                  params={params}
                  resize
                  className={classes.mdDownCard} />
              </Box>}
            </Box>}
      </Box>
    </Container>
  );
};

export default SearchResults;

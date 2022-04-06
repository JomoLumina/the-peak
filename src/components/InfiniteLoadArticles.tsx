import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import LoadArticles from './LoadArticle';
import LoadingScreen from './LoadingScreen';
import GuardianAPI from '../lib/GuardianAPI';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    row: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flex: 'initial'
    }
  }
});

interface InfiniteLoadArticlesProps {
  articles: any; 
  maxWidth: number; 
  height: number;
  hasImage: boolean;
  hasBody: boolean;
  hasMore: boolean;
  resize: boolean;
  params: any;
  className: string;
}

const InfiniteLoadArticles: FC<InfiniteLoadArticlesProps> = (props) => {
  const { classes } = useStyles();
  const { articles, maxWidth, height, className, hasMore, params} = props;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [_hasMore, setHasMore] = useState(hasMore);
  const [_articles, setArticles] = useState(articles);
  const [_params, setParams] = useState(params);
  
  const fetchMoreArticles = () => {
    if(!isLoadingMore){
      setIsLoadingMore(true);
      GuardianAPI("search", {params: _params}).then((res) => {
        if(res.data.response.results){
          setArticles((a: any) => [...a, ...res.data.response.results]);
          setParams((p: { page: number; }) => ({...p, page: p.page + 1}));
          setHasMore(res.data.response.currentPage <= res.data.response.pages);
        }
        setIsLoadingMore(false);
      }).catch((error) =>{
          console.error(error);
          setIsLoadingMore(false);
      })
    };
  }

  useEffect(() => {
    if(params.page === 1){
      params.page = 2;
      setParams(params);
    }
  },[params])
 
  return (
    <Box mb={4} className={classes.row}>
      <InfiniteScroll
        className={classes.row}
        dataLength={_articles.length}
        next={fetchMoreArticles}
        hasMore={_hasMore}
        scrollThreshold="300px"
        loader={<LoadingScreen height={100}/>}>
        <LoadArticles 
          articles={_articles} 
          maxWidth={maxWidth} 
          height={height} 
          hasImage
          hasBody
          resize
          className={className} />
      </InfiniteScroll>
    </Box>)
}

export default InfiniteLoadArticles;




 
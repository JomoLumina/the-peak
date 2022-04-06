import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { Box, Button, Container, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Bookmark as AddBookmarkIcon, BookmarkBorderRounded as RemoveBookmarkIcon } from '@mui/icons-material';
import GuardianAPI from '../../lib/GuardianAPI';
import LoadingScreen from '../../components/LoadingScreen';
import Notification from '../../components/Notification';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    root: {
      position: 'relative',
    },
    header:{
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: '100%',
      [theme.breakpoints.up('sm')]:{
        marginTop: 0,
        width: '60%'
      }
    },
    bookmarkButton:{
      position: 'relative',
      height: theme.spacing(4),
      background: '#09357B',
      color: theme.palette.common.white,
      fontSize: 13,
      lineHeight: '14px',
      padding: 0,
      maxWidth: 180,
      '&:hover':{
        background: 'rgba(9,53,123,0.8)'
      },
    },
    title: {
      display: 'flex',
      fontFamily: 'georgia',
      fontWeight: 700,
      fontSize: theme.spacing(4.24),
      lineHeight: 1,
      color: 'rgba(0,0,0,0.87)',
      '&:hover':{
        color: 'rgba(90,90,90,0.87)',
      },
      '&:active':{
        color: 'rgba(45,45,45,0.87)',
      }
    },
    headline: {
      display: 'flex',
      fontFamily: 'georgia',
      fontWeight: 700,
      fontSize: theme.spacing(2.5),
      lineHeight: 1,
      color: 'rgba(0,0,0,0.87)',
    },
    date: {
      display: 'flex',
      textTransform: 'uppercase'
    },
    contentContainer: {
      position: 'relative',
      minHeight: 'calc(100vh - 525px)'
    },
    content:{
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        flexDirection: 'column-reverse',
      }
    },
    body: {
      fontFamily: 'Roboto',
      display: 'flex',
      width: '60%', 
      marginRight: 10,
      "& *:first-child": {
        marginTop: 0
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%', 
        margin: 'auto' 
      }
    },
    figure: {
      display: 'flex',
      width: '40%', 
      maxHeight: 500,
      [theme.breakpoints.down('sm')]: {
        width: '100%'  
      }
    }
  }
});

interface ArticlePageProps {
  id: string;
}

const ArticlePage: FC<ArticlePageProps> = ({id})  => {
    const { classes } = useStyles();
    const [content, setContent] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<string>('added');
    const [height, setHeight] = useState<number>(0);
    
    const bookmarkedArticlesJSON: string | null = localStorage.getItem('bookmarked-articles');
    const bookmarkedArticles: any = bookmarkedArticlesJSON ? JSON.parse(bookmarkedArticlesJSON) : [];
    const hasBookmarkedArticle: boolean = bookmarkedArticles.filter(
      (bma: any) => bma.id === decodeURIComponent(id)).length > 0;
    const [isBookmarked, setIsBookmarked] = useState<boolean>(hasBookmarkedArticle);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, content: any):void => {
      e.preventDefault();
      if(!isBookmarked){
        bookmarkedArticles.push(content);
        localStorage.setItem('bookmarked-articles', JSON.stringify(bookmarkedArticles));
        setNotificationType('added');
        setHeight(35);
        setTimeout(() => setHeight(0), 2000);
      }else{
        const newBookmarkedArticles = bookmarkedArticles.filter((bma: any) => bma.id !== content.id);
        localStorage.setItem('bookmarked-articles', JSON.stringify(newBookmarkedArticles));
        setNotificationType('removed');
        setHeight(35);
        setTimeout(() => setHeight(0), 2000);
      }
      setIsBookmarked(!isBookmarked);
    }
  
    const fetchArticle = useCallback((): void => {
      const articleUrl = decodeURIComponent(id);
      const params = {"show-elements": "all", "show-fields": "all"};

      GuardianAPI(`/${articleUrl}`, {params}).then((res) => {
        if(res.status === 200){
          setContent(res.data.response.content);
        }
        setIsLoading(false);
      }).catch((error) =>{
          console.error(error);
          setIsLoading(false);
      });
    },[id]);

    useEffect(() => {
      setIsLoading(true);
      fetchArticle(); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchArticle]);
  
  return (
    <Container className={classes.root}>
      {isLoading && <LoadingScreen />}
      {(!isLoading && content) &&
        <Box className={classes.contentContainer}>
          <Box className={classes.header}>
            <Button
              startIcon={isBookmarked ? <RemoveBookmarkIcon /> : <AddBookmarkIcon /> }
              className={classes.bookmarkButton}
              onClick={(e) => handleClick(e, content)}>
              {isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            </Button>
            {/* I really don't think a link on the date is wise or necessary since we have a link on the title */}
            <Typography mt={1.25} className={classes.date}>
              {`${moment(content.webPublicationDate).format("ddd d MMM YYYY HH.mm")}  
              ${moment.tz(moment.tz.guess()).zoneAbbr()}`}
            </Typography>
            <Link to={`/section/${content.sectionId}`} style={{textDecoration: 'none'}}>
              <Typography mt={1.25} className={classes.title}>{content.webTitle}</Typography>
            </Link>
            {/* Used trailText for the headline, because headline is the same as webTitle */}
            <Typography mt={1.25} className={classes.headline}>
              <div dangerouslySetInnerHTML={{ __html: content.fields.trailText }} />
            </Typography>
          </Box>
          <Box className={classes.content} mt={2.5}>
            <Box className={classes.body}>
              <div dangerouslySetInnerHTML={{ __html: content.fields.body }} />
            </Box>
            <Box className={classes.figure}>
              <div dangerouslySetInnerHTML={{ __html: content.fields.main }} />
            </Box>
          </Box>
        </Box>}
        <Notification type={notificationType} height={height}/>
    </Container>
  );
};

export default ArticlePage;

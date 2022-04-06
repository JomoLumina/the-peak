import { FC, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { More as MoreIcon } from '@mui/icons-material';
import GuardianAPI from '../../../lib/GuardianAPI';
import LoadArticles from '../../../components/LoadArticle';
import LoadingScreen from '../../../components/LoadingScreen';

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
      flexWrap: 'wrap'
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
    viewMoreButton:{
      position: 'relative',
      padding: theme.spacing(2),
      height: theme.spacing(4.5),
      background: '#09357B',
      color: theme.palette.common.white,
      fontSize: 13,
      lineHeight: 1,
      '&:hover':{
        background: 'rgba(9,53,123,0.8)'
      },
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

interface ArticleProps{
    section: string;
    heading: string;
}

const Article: FC<ArticleProps>= ({section, heading})  => {
  const { classes } = useStyles();
  
  const [response, setResponse] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArticles = useCallback((): void => {
    const params = {
        type: "article",
        section: section,
        "show-elements": "all",
        "show-fields": 'bodyText,thumbnail',
        "page-size":3
    }

    GuardianAPI("search", {params}).then((res) => {
      if(res.data.response.results){
        setResponse(res.data.response);
      }
      setIsLoading(false);
    }).catch((error) =>{
        console.error(error);
        setIsLoading(false);
    });
  },[section]);

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
            startIcon={<MoreIcon />}
            component={RouterLink}
            to={`/section/${section}`}
            className={classes.viewMoreButton}>
            view more
          </Button>
        </Box>
      </Box>
      <Box className={classes.cardsContainer} mt={4}>
      {isLoading && <LoadingScreen />}
      {(!isLoading && response) &&
            <Box className={classes.mdDownRow}>
            {response.results && 
                <Box mb={4} className={classes.mdDownCard}>
                  <LoadArticles 
                    articles={response.results} 
                    maxWidth={380} 
                    height={345} 
                    hasImage
                    hasBody
                    resize
                    className={classes.mdDownCard} />
              </Box>}
            </Box>
       }
      </Box>
    </Container>
  );
};

export default Article;

import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react'; 
import { Container, Box, Theme, Hidden } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import GuardianAPI from '../../../lib/GuardianAPI';
import LoadingScreen from '../../../components/LoadingScreen';
import LoadArticles from '../../../components/LoadArticle';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    container: {
      [theme.breakpoints.up('lg')]: {
        padding: 0
      }
    },
    content: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      textAlign: 'center'
    },
    card: {
      display: 'flex',
      flex: 1,
    },
    mdDownCard: {
      display: 'flex',
      flex: 'initial',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: theme.spacing(3.75),
      marginRight: theme.spacing(1)
    },
    row: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    mdDownRow: {
      display: 'flex',
      flex: 'initial',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
  }
});

interface CardsContainerProps {
  orderBy: string;
}

export const CardsContainer: FC<CardsContainerProps> = ({orderBy})  => {
  const { classes } = useStyles();

  const [primaryArticle, setPrimaryArticle] = useState<any | null>(null);
  const [secondaryArticles, setSecondaryArticles] = useState<any | null>(null);
  const [noImageArticles, setNoImageArticles] = useState<any | null>(null);
  const [finalArticles, setFinalArticles] = useState<any | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArticles = useCallback((): void => {
    const params = {
        type: "article",
        section: "news",
        "show-elements": "all",
        "show-fields": 'bodyText,thumbnail',
        "page-size":8,
        "order-by": orderBy,
    }

    GuardianAPI("search", {params}).then((res) => {
      if(res.data.response.results){
        setResponse(res.data.response);
        setPrimaryArticle(res.data.response.results.slice(0, 1));
        setSecondaryArticles(res.data.response.results.slice(1, 3));
        setNoImageArticles(res.data.response.results.slice(3, 5));
        setFinalArticles(res.data.response.results.slice(-3));
      }
      setIsLoading(false);
    }).catch((error) =>{
        console.error(error);
        setIsLoading(false);
    });
  },[orderBy]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchArticles]);

  return (
    <Container className={classes.container}>
      {isLoading && <LoadingScreen height={700}/>}
      {(!isLoading && response) &&
        <Box className={classes.content}>
          <Hidden mdDown>
            <Box className={classes.row}>
                <Box className={classes.column} mr={3.75}>
                  {primaryArticle && <LoadArticles 
                                      articles={primaryArticle} 
                                      maxWidth={580} 
                                      height={423} 
                                      hasBody 
                                      hasImage 
                                      resize={false}
                                      className={classes.card} />}
                </Box>
                <Box className={classes.column} sx={{minWidth: 580}}>
                  <Box className={classes.row}>
                    {secondaryArticles && <LoadArticles 
                                            articles={secondaryArticles} 
                                            maxWidth={270} 
                                            height={252} 
                                            hasImage 
                                            hasBody={false}
                                            resize={false}
                                            className={classes.card} />}
                  </Box>
                  <Box className={classes.row}>
                  {noImageArticles && <LoadArticles 
                                            articles={noImageArticles} 
                                            maxWidth={270} 
                                            height={138} 
                                            hasImage={false} 
                                            hasBody={false}
                                            resize={false}
                                            className={classes.card} />}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.row}>
              {finalArticles && <LoadArticles 
                                            articles={finalArticles} 
                                            maxWidth={380} 
                                            height={345} 
                                            hasImage
                                            hasBody
                                            resize
                                            className={classes.card} />}
              </Box>
          </Hidden>
          <Hidden mdUp>
            <Box className={classes.mdDownRow}>
              {response.results && 
                <Box mb={4} className={classes.mdDownRow}>
                  <LoadArticles 
                    articles={response.results} 
                    maxWidth={350} 
                    height={345} 
                    hasImage
                    hasBody
                    resize
                    className={classes.mdDownCard} />
                </Box>}
            </Box>
          </Hidden>
        </Box>
      } 
    </Container>
  );
};



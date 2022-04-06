import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Page from '../../components/Page';
import ArticlePage from './ArticlePage';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      overflow: 'hidden',
    },
    container: {
      padding: theme.spacing(3, 0),
    }
  }
});


const ArticleView: FC = () => {
  const { classes } = useStyles();
  const { id }= useParams();
  const heading = 'Article';

  return (
    <Page
      className={classes.root}
      title={`The Peak: ${heading}`}>
      <Container maxWidth="lg" className={classes.container}>
        <Box mt={4}>
          {id && <ArticlePage id={id}/>}
        </Box>
      </Container>
    </Page>
  );
};

export default ArticleView;

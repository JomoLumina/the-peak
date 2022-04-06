import { FC, useEffect } from 'react';
import { Box, Container, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Page from '../../components/Page';
import SearchResults from './SearchResults';
import { useParams } from 'react-router-dom';

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


const SearchResultsView: FC = () => {
  const { classes } = useStyles();
  const { query }= useParams();
  const heading = 'Search Results';

  useEffect(() => {
  },[query])
  return (
    <Page
      className={classes.root}
      title={`The Peak: ${heading}`}>
      <Container maxWidth="lg" className={classes.container}>
        <Box mt={4}>
          <SearchResults query={query} heading={heading}/>
        </Box>
      </Container>
    </Page>
  );
};

export default SearchResultsView;

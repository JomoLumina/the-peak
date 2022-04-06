import type { FC } from 'react';
import { Box, Container, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Page from '../../components/Page';
import TopStories from './TopStories';
import Articles from './Articles';

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

const HomeView: FC = () => {
  const { classes } = useStyles();

  return (
    <Page
      className={classes.root}
      title="The Peaks: Home">
      <Container maxWidth="lg" className={classes.container}>
        <Box mt={2}>
          <TopStories />
        </Box>
        <Box mt={4}>
          <Articles />
        </Box>
      </Container>
    </Page>
  );
};

export default HomeView;

import type { FC } from 'react';
import { Box, Container, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Page from '../../components/Page';
import AllBookmark from './Bookmarks';

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


const BookmarksView: FC = () => {
  const { classes } = useStyles();

  return (
    <Page
      className={classes.root}
      title={`The Peak: All Bookmark`}>
      <Container maxWidth="lg" className={classes.container}>
        <Box mt={4}>
          <AllBookmark />
        </Box>
      </Container>
    </Page>
  );
};

export default BookmarksView;

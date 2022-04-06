import type { FC } from 'react';
import { Box, Container, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Page from '../../components/Page';
import Section from './Section';
import { useParams } from 'react-router-dom';
import { SECTIONS } from '../../constants';

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


const SectionView: FC = () => {
  const { classes } = useStyles();
  const { section }= useParams();
  const _sections = SECTIONS.filter(s => s.name === section);
  const heading = _sections.length > 0 ? _sections[0]?.heading : 'News';

  return (
    <Page
      className={classes.root}
      title={`The Peak: ${heading} Section`}>
      <Container maxWidth="lg" className={classes.container}>
        <Box mt={4}>
          <Section name={section || "news"} heading={heading}/>
        </Box>
      </Container>
    </Page>
  );
};

export default SectionView;

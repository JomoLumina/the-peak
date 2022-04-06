import type { FC } from 'react';
import { 
  Box, Container, Theme 
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Article from './Article';
import { SECTIONS } from '../../../constants';

const useStyles = makeStyles()((theme: Theme) => {
  return { 
    root: {
      padding: 0,
      [theme.breakpoints.up('lg')]: {
        padding: 0
      }
    },
  }
});

const Articles: FC = ()  => {
  const { classes } = useStyles();
  const sections = SECTIONS;
  return (
    <Container className={classes.root}>
      {sections && sections.map((section) => {
        return (
          <Box key={section.id}>
            <Article section={section.name} heading={section.heading} />
          </Box>
        )
      })}
    </Container>
  );
};

export default Articles;

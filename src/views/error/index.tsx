import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography,
  useTheme, useMediaQuery, Theme
} from '@mui/material';
import Page from '../../components/Page';
import { makeStyles } from 'tss-react/mui';
import { NotFoundImg } from '../../assets';

const useStyles = makeStyles()((theme: Theme) => {
    return {
        root: {
            background: theme.palette.common.white,
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
        header: {
          fontFamily: 'Georgia',
          fontWeight: 700,
          [theme.breakpoints.down('sm')]:{
            marginTop: theme.spacing(4)
          }
        },
        image: {
            maxWidth: '100%',
            width: 360,
            maxHeight: 300,
            height: 'auto'
        },
        button:{
          color: "#09357B"
        }
    }
});

const NotFoundView: FC = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="404: Not found"
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? 'h6' : 'h4'}
          color="textPrimary"
          className={classes.header}
        >
          Oops, How did you get here
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          color="textSecondary"
        >
          You either tried some shady route or you
          came here by mistake.
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <img
            alt="Under development"
            className={classes.image}
            src={NotFoundImg}
          />
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="center">
          <Button
            className={classes.button}
            component={RouterLink}
            to="/"
            variant="outlined">
            Back to home
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default NotFoundView;

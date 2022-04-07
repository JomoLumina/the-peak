import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { PlaceHolderImg } from '../assets';
import { Link } from 'react-router-dom';
import type { Article as NewsCardProps } from '../types/article';
import { SECTIONS } from '../constants';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      textAlign: 'left',
      transition: 'all 200ms ease-in-out',
      cursor: 'pointer',
      width: '100%',
      '&:hover':{
        transform: 'scale(1.05)',
        opacity: 0.9
      }
    },
    link:{
      display: 'flex',
      flex: 1,
      textDecoration: 'none'
    },
    cardContent: {
      display: 'flex',
      alignItems: 'flex-end',
      backgroundSize: '100% 100%',
      padding: 0,
      backgroundColor: "#0D47A1",
      border: `1px solid ${theme.palette.common.black}`,
      borderBottom: '4px solid',
      minWidth: '100%',
      '&:last-child': {
        padding: 0
      },
    },
    cardDetails: {
      flexDirection: 'column',
      display: 'flex',
      height: 120,
      padding: '10px 10px 0',
      width: '100%',
      justifyContent: 'flex-start',
      background: "#09357BE5"
    },
    title: {
      display: 'flex',
      fontFamily: 'Georgia',
      fontSize: 24,
      fontWeight: 700,
      lineHeight: "31px",
      color: theme.palette.common.white,
      height: 64,
      overflow: 'hidden',
      flex: '1 1 auto',
      marginRight: theme.spacing(4),
      marginBottom: 0,
      alignItems: 'flex-start'
    },
    body: {
      display: 'flex',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
      color: theme.palette.common.white,
      height: 64,
      overflow: 'hidden'
    }
  }
});

const NewsCard: FC<NewsCardProps> = (cardDetails:NewsCardProps) => {
  const { classes } = useStyles();
  const hasImage = cardDetails.hasImage;
  const backgroundImage = cardDetails.body?.image ? cardDetails.body.image : PlaceHolderImg;
  const maxWidth = cardDetails.style?.maxWidth || 350;
  const height = cardDetails.style?.height || 347;
  const articleId = encodeURIComponent(cardDetails.id);
  const sections = SECTIONS.filter(s => s.name === cardDetails.sectionId);
  const section = sections.length > 0 ? sections[0] : null;
  const borderBottomColor = section ? section.color : '#388E3C'; 
  return (
    <Link to={`/article/${articleId}`} className={classes.link}>
      <Card sx={{ maxWidth: maxWidth, height: height }} className={classes.root}>
        <CardContent className={classes.cardContent} 
          style={{backgroundImage: hasImage ? `url("${backgroundImage}")` : "", 
                  borderBottomColor: borderBottomColor}}>
          <Box className={classes.cardDetails}>
            <Typography gutterBottom variant="h1" component="div" className={classes.title}>
              {cardDetails.body?.title}
            </Typography>
            {(cardDetails.hasBody && cardDetails.body) &&
              <Typography variant="body2" color="text.primary" className={classes.body}>
              {cardDetails.body.text}
              </Typography>
            }  
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

NewsCard.propTypes = {
    id: PropTypes.string.isRequired,
    hasImage: PropTypes.bool.isRequired,
    hasBody: PropTypes.bool.isRequired,
    body: PropTypes.any,
    style: PropTypes.any,
};

NewsCard.defaultProps = {
  style:{
    maxWidth: 350,
    height: 347
  }
}

export default NewsCard;
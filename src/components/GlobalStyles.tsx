import type { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(()  => {
  return {
    '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}});

const GlobalStyles: FC = () => {
  useStyles();
  return null;
};

export default GlobalStyles;

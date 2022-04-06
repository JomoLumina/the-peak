import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";
import { Router } from './routes';
import GoogleAnalytics from "./components/GoogleAnalytics";
import GlobalStyles from "./components/GlobalStyles";

const muiCache = createCache({
  'key': 'mui',
  'prepend': true,
});
  
const App = () => {
  return (
    <CacheProvider value={muiCache}>
      <GlobalStyles />
      <GoogleAnalytics />
      <Router />
    </CacheProvider>
  );
}

export default App;
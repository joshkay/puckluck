import React, { useEffect } from 'react';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import client from 'utils/apollo';
import ResponsiveDrawer from '../components/navigation/ResponsiveDrawer';
import theme from '../theme';

const App = ({ Component, pageProps }) =>
{

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Puck Luck</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Karla&display=swap" rel="stylesheet" />
      </Head>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ResponsiveDrawer>
            <Component {...pageProps} />
          </ResponsiveDrawer>
        </MuiThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;

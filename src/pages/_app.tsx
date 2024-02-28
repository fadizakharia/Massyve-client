import { Provider } from 'react-redux';
import store from '@/redux/store';
import { useEffect } from 'react';
import { setToken } from '../redux/authSlice';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { Navbar } from '../components/Navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }:any) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the token in Redux state if it exists
      store.dispatch(setToken(token));
    }
  }, []);

  return (
   
    <Provider store={store}>
       <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
          <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />

        <title>Massyve</title>
      </Head>
            <Navbar/>
            <Component {...pageProps} />
          </ThemeProvider>
        </AppRouterCacheProvider>
    </Provider>
   
  );
}

export default MyApp;
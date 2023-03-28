import ThemeContext from '@/contexts/ThemeContext';
import { getDirection } from '@/lib/constants';
import { NextPageWithLayout } from '@/types';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import './../css/index.css';
import './../css/style.css';
import "./../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { locale } = useRouter();
  const dir = getDirection(locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeContext>
            {getLayout(<Component {...pageProps} />)}
          </ThemeContext>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </SSRProvider>
  )
}
export default appWithTranslation(App)

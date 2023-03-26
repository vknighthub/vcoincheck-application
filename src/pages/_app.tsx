import ThemeContext from '@/contexts/ThemeContext';
import { getDirection } from '@/lib/constants';
import { NextPageWithLayout } from '@/types';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import './../css/style.css';
import './../css/index.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


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

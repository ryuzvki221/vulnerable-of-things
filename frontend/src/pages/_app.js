import Head from 'next/head';

import "@/styles/globals.css";
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import MotionLazyContainer from "@/components/animate/MotionLazyContainer";
import { NotistackProvider, ProgressBar } from "@/components";
import ThemeProvider from "@/theme";

// react-query
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

 
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient();

  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
    <NotistackProvider>
      <MotionLazyContainer>
        <ProgressBar />
        <AppCacheProvider {...pageProps}>
        {getLayout(<Component {...pageProps} />)}
        </AppCacheProvider> 
      </MotionLazyContainer>
      </NotistackProvider>
    </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
    </>

  );
}

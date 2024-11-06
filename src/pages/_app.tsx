import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    // QueryClient’i bir kere oluşturup uygulama genelinde paylaşırız
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <title>Travelgo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Meeting the world" />
                <link rel="icon" href="/travel.ico" type="image/png" />
            </Head>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default appWithTranslation(MyApp);

import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Travelgo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Meeting the world" />
                <link rel="icon" href="/travel.ico" type="image/png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default appWithTranslation(MyApp);

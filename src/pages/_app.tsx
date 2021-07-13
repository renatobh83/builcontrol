import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "../context/AppContext";
import "semantic-ui-css/semantic.min.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

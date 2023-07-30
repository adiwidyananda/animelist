import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Open_Sans } from "next/font/google";
import "../styles/base.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const OpenSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export type NextPageWithLayout<P = Record<string, any>> = NextComponentType<
  NextPageContext,
  any,
  P
> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
  });
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <>
      <style jsx global>{`
        :root {
          --font-openSans: ${OpenSans.style.fontFamily};
        }
      `}</style>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </>
  );
}

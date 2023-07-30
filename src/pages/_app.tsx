import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { NextComponentType, NextPageContext } from "next";
import "../styles/base.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

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
    <ApolloProvider client={client}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
}

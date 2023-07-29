import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { NextComponentType, NextPageContext } from "next";
import "../styles/base.css";

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
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}

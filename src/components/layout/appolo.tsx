import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
  });
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

export default Layout;

import { Box, Container, Layout } from "@components";
import { css } from "@emotion/css";
import { useQuery, gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Page = () => {
  const GET_LOCATIONS = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, search: $search) {
          id
          bannerImage
          title {
            romaji
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    variables: { page: 1, perPage: 10 },
  });
  return (
    <Container>
      <Box
        className={css`
          padding: 32px;
          margin-top: 22px;
          background-color: brown;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: red;
          }
        `}
      >
        <h1>Hello, anime app!</h1>
      </Box>
    </Container>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

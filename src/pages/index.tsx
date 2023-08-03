import { Box, Container, Layout, Card, Button, SVGSpinner } from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import { useCallback, useEffect } from "react";
import { useAnimeList } from "@libs/hooks/anime";
import { Anime } from "@libs/utils/type";

const Page = () => {
  const { data, loading, hasNextPage, currentPage, getData } = useAnimeList();
  const handleNextPage = useCallback(() => {
    getData(currentPage + 1);
  }, [currentPage]); //eslint-disable-line

  useEffect(() => {
    getData(currentPage + 1);
  }, []);
  return (
    <Container>
      <Box
        className={css`
          margin-top: 22px;
          font-size: 36px;
          border-radius: 4px;
          color: white;
          font-weight: 700;
          margin-bottom: 24px;
        `}
      >
        Anime List
      </Box>
      <Box
        className={cx(css`
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        `)}
      >
        {data?.map((anime: Anime, index: number) => (
          <Box
            key={index}
            className={cx(css`
              grid-column: span 4 / span 4;
              @media only screen and (max-width: 1000px) {
                grid-column: span 6 / span 6;
              }
              @media only screen and (max-width: 600px) {
                grid-column: span 12 / span 12;
              }
            `)}
          >
            <Card data={anime} />
          </Box>
        ))}
      </Box>
      <Box
        className={cx(css`
          display: flex;
          height: 200px;
          justify-content: center;
          align-items: center;
        `)}
      >
        {loading ? (
          <SVGSpinner />
        ) : (
          <>
            {hasNextPage && (
              <Button onClick={() => handleNextPage()}>Load More</Button>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

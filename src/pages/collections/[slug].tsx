import { Box, Container, Layout, Card } from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import { useCollections } from "@libs/contexts/collection";
import { Anime, CollectionType } from "@libs/utils/type";
import { useRouter } from "next/router";

const CollectionDetail = () => {
  const { collections } = useCollections();
  const router = useRouter();
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
        {
          collections?.find(
            (x: CollectionType) => x.slug === router?.query?.slug
          )?.name
        }{" "}
        Collection
      </Box>
      <Box
        className={cx(css`
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        `)}
      >
        {collections
          ?.find((x: CollectionType) => x.slug === router?.query?.slug)
          ?.listAnime?.map((anime: Anime, index: number) => (
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
              <Card
                showRemove
                collectionID={
                  collections?.find(
                    (x: CollectionType) => x.slug === router?.query?.slug
                  ).id
                }
                data={anime}
              />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default CollectionDetail;

CollectionDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

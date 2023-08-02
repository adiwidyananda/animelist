import {
  Box,
  Container,
  Layout,
  Button,
  Select,
  Info,
  Modal,
  Card,
  CollectionTag,
} from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import Image from "next/image";
import { Anime } from "@libs/utils/type";
import client from "@libs/utils/appolo-client";
import { SingleAnime } from "@libs/queries/anime";
import { useState, useCallback, useEffect } from "react";
import { useCollections } from "@libs/contexts/collection";
import { useCollection } from "@libs/hooks/collections";

interface CardProps {
  data: Anime;
}

const Page = ({ data }: CardProps) => {
  const { collections } = useCollections();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listCollections, setListCollection] = useState<any>();
  const { addAnime, addLoading, createCollectionWithAnime } = useCollection();
  const [isInCollection, setIsInCollection] = useState<boolean>(false);
  const [collectionID, setCollectionID] = useState<string>(
    collections?.[0]?.id
  );

  useEffect(() => {
    const animeCollection = collections?.filter((x: any) =>
      x?.listAnime?.some((x: any) => x?.id === data?.id)
    );
    setListCollection(animeCollection);
  }, [collections]);
  useEffect(() => {
    const selectedCollection = collections?.find(
      (x: any) => x?.id === collectionID
    );
    setIsInCollection(
      selectedCollection?.listAnime?.some((x: any) => x?.id === data?.id)
    );
  }, [collectionID]);
  const onSubmit = useCallback(async () => {
    await addAnime({
      collectionID: collectionID,
      anime: data,
    });
    setOpenModal(false);
    setIsInCollection(true);
  }, [collectionID]);

  const handleAddToColection = useCallback(() => {
    if (collections?.length > 0) {
      setOpenModal(true);
    } else {
      createCollectionWithAnime(data);
      setIsInCollection(true);
    }
  }, [collections]);
  return (
    <Container>
      <Box
        className={cx(css`
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          margin-top: 40px;
          background: rgba(255, 255, 255, 0.1);
        `)}
      >
        <Box
          className={cx(css`
            grid-column: span 6 / span 6;
            position: relative;
            aspect-ratio: 16/14;
            img {
              object-fit: fill;
            }
            @media only screen and (max-width: 820px) {
              grid-column: span 12 / span 12;
            }
          `)}
        >
          <Image src={data?.coverImage?.extraLarge} alt="1" layout="fill" />
        </Box>
        <Box
          className={cx(css`
            grid-column: span 6 / span 6;
            @media only screen and (max-width: 820px) {
              grid-column: span 12 / span 12;
            }
            padding: 12px;
            display: flex;
            align-items: center;
          `)}
        >
          <Box>
            <Box
              className={cx(css`
                font-size: 36px;
                color: white;
              `)}
            >
              {data?.title?.romaji}
            </Box>
            <div
              className={cx(css`
                font-size: 14px;
                margin-top: 40px;
                color: rgb(103, 102, 110);
              `)}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
            {listCollections?.length > 0 && (
              <>
                <Box
                  className={css`
                    color: white;
                    font-weight: 500;
                    font-size: 16px;
                    margin-top: 20px;
                    margin-bottom: 10px;
                  `}
                >
                  Collection:
                </Box>
                <Box
                  className={css`
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 4px;
                  `}
                >
                  {listCollections?.map((x: any, index: number) => (
                    <CollectionTag
                      key={index}
                      linkUrl={`/collection/${x?.slug}`}
                      name={x?.name}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        className={cx(css`
          color: rgb(103, 102, 110);
          margin-top: 24px;
        `)}
      >
        <Box
          className={cx(css`
            color: white;
            font-size: 24px;
          `)}
        >
          Anime Info
        </Box>
        <Info label="Release" description={data?.startDate?.year} />
        <Info label="Score" description={data?.averageScore / 10} />
        <Info label="Episodes" description={data?.episodes} />
        <Info label="Genres" description={data?.genres?.join(", ")} />
      </Box>
      <Box
        className={css`
          margin-top: 24px;
        `}
      >
        <Button fullWidth onClick={() => handleAddToColection()}>
          Add To Collection
        </Button>
      </Box>
      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <Box
          className={css`
            width: 90vw;
            max-width: 600px;
            height: 80vh;
            background: #fcfcfc;
            padding: 24px;
            overflow: auto;
            border-radius: 8px;
            @media only screen and (max-width: 600px) {
              height: 60vh;
            }
          `}
        >
          <Box
            onClick={() => setOpenModal(false)}
            className={css`
              text-align: right;
              margin-bottom: 10px;
              cursor: pointer;
            `}
          >
            X
          </Box>
          <Select
            options={collections}
            value={collectionID}
            onChange={(e) => setCollectionID(e.target.value)}
          />
          <Box
            className={css`
              margin-top: 20px;
            `}
          >
            <Box>
              {isInCollection}
              <Card data={data} redirect={false} />
            </Box>
            <Button
              loading={addLoading}
              className={css`
                margin-top: 20px;
              `}
              onClick={() => onSubmit()}
              fullWidth
              disabled={isInCollection}
            >
              {isInCollection ? "Already Added " : "Add To Collection"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Page;

export async function getServerSideProps(ctx: any) {
  try {
    const { data: res } = await client.query({
      query: SingleAnime,
      variables: {
        id: ctx?.query?.id,
      },
    });
    return { props: { data: res?.Media } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

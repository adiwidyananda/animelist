import {
  Box,
  Container,
  Layout,
  Card,
  Button,
  Input,
  Modal,
} from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import { useCollections } from "@libs/contexts/collection";
import { Anime, CollectionType } from "@libs/utils/type";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { useCollection } from "@libs/hooks/collections";
const slugify = require("slugify");

const CollectionDetail = () => {
  const router = useRouter();
  const { collections } = useCollections();
  const { updateCollection } = useCollection();
  const [isOpenCollectionModal, setIsOpenCollectionModal] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editCollection, setEditCollection] = useState<string>();
  const onSubmit = useCallback(async () => {
    if (editCollection) {
      updateCollection({
        collectionID: collections?.find(
          (x: CollectionType) => x.slug === router?.query?.slug
        )?.id,
        name: editCollection,
      });
      setIsOpenCollectionModal(false);
      const slug = slugify(editCollection, {
        lower: true,
        remove: /[*+~%<>/;.(){}?,'"!:@#^|]/g,
      });
      router.push(`/collections/${slug}`, undefined, {
        scroll: false,
        shallow: true,
      });
    }
  }, [editCollection]);
  const handleNameChange = (value: string) => {
    if (!value) {
      setErrorMessage(`Please insert name of collection`);
      return;
    }
    if (/[^a-zA-Z\d\s:]/.test(value)) {
      setErrorMessage(
        `Please don't use special characters in the collection name`
      );
      return;
    }
    if (
      collections?.some((x: CollectionType) => x.name === value) &&
      value !==
        collections?.find((x: CollectionType) => x.slug === router?.query?.slug)
          ?.name
    ) {
      setErrorMessage(`Name has been used`);
      return;
    }
    setEditCollection(value);
    setErrorMessage("");
  };
  return (
    <Container>
      <Box
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 22px;
          margin-bottom: 24px;
          @media only screen and (max-width: 600px) {
            display: block;
          }
        `}
      >
        {" "}
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
        <Button onClick={() => setIsOpenCollectionModal(true)}>
          Edit Collection
        </Button>
      </Box>
      <Box
        className={cx(css`
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        `)}
      >
        {collections?.find(
          (x: CollectionType) => x.slug === router?.query?.slug
        )?.listAnime?.length > 0 ? (
          <>
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
          </>
        ) : (
          <Box
            className={cx(css`
              grid-column: span 12 / span 12;
              background: #161716;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              height: 100px;
            `)}
          >
            No anime has been added yet
          </Box>
        )}
      </Box>
      <Modal
        isOpen={isOpenCollectionModal}
        setIsOpen={setIsOpenCollectionModal}
      >
        <Box
          className={cx(css`
            width: 90vw;
            max-width: 600px;
            height: fit-content;
            background: #fcfcfc;
            color: black;
            padding: 24px;
            overflow: auto;
            border-radius: 8px;
          `)}
        >
          <Box
            onClick={() => setIsOpenCollectionModal(false)}
            className={css`
              text-align: right;
              margin-bottom: 10px;
              cursor: pointer;
            `}
          >
            X
          </Box>
          <Box>
            <Box>
              <Input
                label="Name"
                defaultValue={
                  collections?.find(
                    (x: CollectionType) => x.slug === router?.query?.slug
                  )?.name
                }
                onChange={(e) => handleNameChange(e.target.value)}
                errorMessage={errorMessage}
              />
            </Box>
            <Button
              className={css`
                margin-top: 10px;
              `}
              onClick={() => !errorMessage && onSubmit()}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default CollectionDetail;

CollectionDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

import {
  Box,
  Container,
  Layout,
  Button,
  Modal,
  Input,
  CollectionCard,
} from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import { useCallback, useState } from "react";
import { useCollections } from "@libs/contexts/collection";
import { useCollection } from "@libs/hooks/collections";

const Page = () => {
  const { collections } = useCollections();
  const { createCollection } = useCollection();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [newCollection, setNewCollection] = useState<string>();
  const [isOpenCollectionModal, setIsOpenCollectionModal] =
    useState<boolean>(false);
  const onSubmit = useCallback(async () => {
    if (newCollection) {
      createCollection(newCollection);
      setIsOpenCollectionModal(false);
    }
  }, [newCollection]);
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
    if (collections?.some((x: any) => x.name === value)) {
      setErrorMessage(`Name has been used`);
      return;
    }
    setNewCollection(value);
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
        <Box
          className={css`
            font-size: 36px;
            border-radius: 4px;
            color: white;
            margin-bottom: 0px;
            font-weight: 700;
            @media only screen and (max-width: 600px) {
              margin-bottom: 20px;
            }
          `}
        >
          Collections
        </Box>
        <Button onClick={() => setIsOpenCollectionModal(true)}>
          Create Collection
        </Button>
      </Box>
      <Box
        className={cx(css`
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        `)}
      >
        {collections?.map((x: any, index: number) => (
          <Box
            key={index}
            className={cx(css`
              grid-column: span 6 / span 6;
              @media only screen and (max-width: 600px) {
                grid-column: span 12 / span 12;
              }
            `)}
          >
            <CollectionCard data={x} />
          </Box>
        ))}
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
              create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

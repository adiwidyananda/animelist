import { Box, Container, Layout, Button, Modal, Input } from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCollections } from "@libs/contexts/collection";
import { useCollection } from "@libs/hooks/collections";

const Page = () => {
  const { collections, setCollections } = useCollections();
  const { createCollection, deleteCollection } = useCollection();
  console.log(collections);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (values: any) => {
    createCollection(values.name);
  };
  const onDeleteCollection = (id: string) => {
    deleteCollection(id);
  };
  const [isOpenCollectionModal, setIsOpenCollectionModal] =
    useState<boolean>(false);
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
          `)}
        ></Box>
        <Box
          className={cx(css`
            grid-column: span 6 / span 6;
          `)}
        >
          <Button onClick={() => setIsOpenCollectionModal(true)}>
            Add To Collection
          </Button>
          {collections?.length > 0 && (
            <>
              {collections?.map((x: any, index: number) => (
                <Box onClick={() => onDeleteCollection(x.id)} key={index}>
                  {x?.name}
                </Box>
              ))}
            </>
          )}
          <Modal
            isOpen={isOpenCollectionModal}
            setIsOpen={setIsOpenCollectionModal}
          >
            <Box
              className={cx(css`
                background: rgba(255, 255, 255, 0.1);
                color: white;
                width: 600px;
              `)}
            >
              <Box>
                <Box>testts tetstst</Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input {...register("name")} />
                  <Button submit={true}>create</Button>
                </form>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

import {
  Box,
  Container,
  Layout,
  Button,
  Select,
  Info,
  Modal,
} from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import Image from "next/image";
import { Anime } from "@libs/utils/type";
import client from "@libs/utils/appolo-client";
import { SingleAnime } from "@libs/queries/anime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCollections } from "@libs/contexts/collection";
import { useCollection } from "@libs/hooks/collections";

interface CardProps {
  data: Anime;
}

const Page = ({ data }: CardProps) => {
  const { collections, setCollections } = useCollections();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { addAnime } = useCollection();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const [value, setValue] = useState<string>();
  const onSubmit = async (values: any) => {
    addAnime({
      collectionID: values?.collection,
      anime: data,
    });
  };
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
        >
          <Image src={data?.coverImage?.extraLarge} alt="1" layout="fill" />
        </Box>
        <Box
          className={cx(css`
            grid-column: span 6 / span 6;
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
        <Button fullWidth onClick={() => setOpenModal(true)}>
          Add To Collection
        </Button>
      </Box>
      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <Box
          className={css`
            width: 100vw;
            max-width: 600px;
            height: fit-content;
            background: #fcfcfc;
          `}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {value}
            <Select options={collections} {...register("collection")} />
            <Button submit={true}>Add To Collection</Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default Page;

export async function getServerSideProps(ctx: any) {
  try {
    console.log(ctx?.query);
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

import { Box, Container, Layout, Button, Select } from "@components";
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
      anime: data
    })
  }
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
          `)}
        >
          <Box>{data?.title?.romaji}</Box>
          <form onSubmit={handleSubmit(onSubmit)}>
          {value}
          <Select
          options={collections}
          {...register("collection")}
      />
      <Button submit={true}>Add To Collection</Button>
      </form>
        </Box>
      </Box>
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

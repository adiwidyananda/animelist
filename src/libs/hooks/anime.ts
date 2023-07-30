import { useState, useEffect, useCallback } from "react";
import client from "@libs/utils/appolo-client";
import { AnimeList } from "@libs/queries/anime";
import { Anime } from "@libs/utils/type";

export const useAnimeList = () => {
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getData = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const { data: res } = await client.query({
          query: AnimeList,
          variables: {
            page: page,
            perPage: 10,
          },
        });
        if (res?.Page?.media?.length > 0) {
          setData(data.concat(res?.Page?.media));
          setHasNextPage(res?.Page?.pageInfo?.hasNextPage);
          setCurrentPage(res?.Page?.pageInfo?.currentPage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  return {
    data,
    loading,
    hasNextPage,
    currentPage,
    getData,
  };
};

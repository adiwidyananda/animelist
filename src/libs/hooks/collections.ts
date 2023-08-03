import { useCollections } from "@libs/contexts/collection";
import {
  Anime,
  CollectionType,
  AddAnimeProps,
  RemoveAnimeProps,
} from "@libs/utils/type";
import { v4 } from "uuid";
import { useState } from "react";
const slugify = require("slugify");

export const useCollection = () => {
  const { collections, setCollections } = useCollections();
  const [addLoading, setAddLoading] = useState<boolean>(false);

  const createCollection = (title: string) => {
    const newCollection = {
      id: v4(),
      name: title,
      slug: slugify(title, {
        lower: true,
        remove: /[*+~%<>/;.(){}?,'"!:@#^|]/g,
      }),
      listAnime: [],
    };
    setCollections(collections?.concat(newCollection));
  };
  const createCollectionWithAnime = (anime: Anime) => {
    const newCollection = {
      id: v4(),
      name: anime?.title?.romaji,
      slug: slugify(anime?.title?.romaji, {
        lower: true,
        remove: /[*+~%<>/;.(){}?,'"!:@#^|]/g,
      }),
      listAnime: [anime],
    };
    setCollections(collections?.concat(newCollection));
  };
  const deleteCollection = (id: string) => {
    const newCollection = collections?.filter(
      (collection: CollectionType) => collection?.id !== id
    );
    setCollections(newCollection);
  };
  const addAnime = (data: AddAnimeProps) => {
    setAddLoading(true);
    const newCollection = collections?.map((x: CollectionType) => {
      if (x?.id === data?.collectionID) {
        return {
          ...x,
          listAnime: x.listAnime && x.listAnime.concat(data?.anime),
        };
      } else {
        return x;
      }
    });
    setCollections(newCollection);
    setAddLoading(false);
  };
  const removeAnime = ({ collectionID, animeID }: RemoveAnimeProps) => {
    setAddLoading(true);
    const newCollection = collections?.map((x: CollectionType) => {
      if (x?.id === collectionID) {
        return {
          ...x,
          listAnime: x?.listAnime?.filter((x: Anime) => x?.id !== animeID),
        };
      } else {
        return x;
      }
    });
    setCollections(newCollection);
    setAddLoading(false);
  };
  return {
    createCollection,
    deleteCollection,
    addAnime,
    createCollectionWithAnime,
    addLoading,
    removeAnime,
  };
};

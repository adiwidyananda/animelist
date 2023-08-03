import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Anime } from "@libs/utils/type";

export interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  listAnime?: [Anime];
}

type CollectionsContextType = {
  collections: any | null;
  setCollections: (props: CollectionItem | null) => void;
};

const cartContextDefaultValues: CollectionsContextType = {
  collections: null,
  setCollections: (props: CollectionItem | null) => {},
};

const CollectionsContext = createContext<CollectionsContextType>(
  cartContextDefaultValues
);

export function useCollections() {
  return useContext(CollectionsContext);
}

type Props = {
  children: ReactNode;
};

export function CollectionsProvider({ children }: Props) {
  const [collectionsItem, setCollectionsItem] = useState<CollectionItem | null>(
    () => {
      const fromStorage =
        typeof window !== "undefined"
          ? localStorage.getItem("collections")
          : null;
      return JSON.parse(fromStorage ?? "[]");
    }
  );

  useEffect(() => {
    if (collectionsItem)
      localStorage.setItem("collections", JSON.stringify(collectionsItem));
  }, [collectionsItem]);

  const value = {
    collections: collectionsItem,
    setCollections: setCollectionsItem,
  };

  return (
    <>
      <CollectionsContext.Provider value={value}>
        {children}
      </CollectionsContext.Provider>
    </>
  );
}

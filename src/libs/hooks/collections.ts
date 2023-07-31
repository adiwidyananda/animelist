import { useCollections } from "@libs/contexts/collection"
import { v4 } from 'uuid';

export const useCollection = () => {
    const { collections, setCollections } = useCollections();

  const createCollection = (title:string) => {
    const newCollection = {
        id: v4(),
        name: title,
        listAnime: []
    }
    setCollections(collections?.concat(newCollection));
  }
  const deleteCollection = (id:string) => {
    const newCollection = collections?.filter((collection:any) => collection?.id !== id);
    setCollections(newCollection);
  }
  const addAnime = (data:any) => {
    const newCollection = collections?.map((x:any) => {
      if (x?.id === data?.collectionID) {
        return {
          ...x,
          listAnime: x.listAnime.concat(data?.anime)
        }
      } else {
        return x;
      }
    }) 
    setCollections(newCollection);
  }
  return {
    createCollection,
    deleteCollection,
    addAnime
  };
};

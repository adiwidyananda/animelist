export type Anime = {
  id: number | string;
  description: string;
  title: {
    romaji: string;
  };
  averageScore: number;
  startDate: {
    year: string;
  };
  bannerImage: any;
  coverImage: {
    large: string;
    extraLarge: string;
  };
  genres: [string];
  episodes: number;
};

export type InfoType = {
  label: string;
  description: string | number;
};

export type CollectionType = {
  id: string;
  name: string;
  slug: string;
  listAnime?: [Anime] | [];
};

export type AddAnimeProps = {
  collectionID: string;
  anime: any;
};

export type RemoveAnimeProps = {
  collectionID: string | undefined;
  animeID: string | number;
};

export type SelectOptionsProps = {
  id: string;
  name: string;
};

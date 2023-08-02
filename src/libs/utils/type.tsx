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

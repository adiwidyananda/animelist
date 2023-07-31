export type Anime = {
  id: number;
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
};

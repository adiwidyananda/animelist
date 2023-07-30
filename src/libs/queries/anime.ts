import { gql } from "@apollo/client";

export const AnimeList = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
        id
        bannerImage
        coverImage {
          large
        }
        title {
          romaji
        }
        description
        startDate {
          year
        }
        averageScore
      }
    }
  }
`;

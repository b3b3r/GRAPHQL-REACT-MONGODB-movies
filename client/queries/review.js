import gql from 'graphql-tag';

export const createReview = gql
  `
  mutation CreateReview($content: String, $movieID: ID!){
    addReviewToMovie(content: $content, movieId: $movieID){
      id,
      title,
      reviews{
        id,
        content,
        likes
      }
    }
  }
`;

export const likeReview = gql
  `
  mutation LikeReview($id: ID!){
    likeReview(id: $id){
      id,
      likes
    }
  }
`;
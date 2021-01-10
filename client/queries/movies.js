import gql from 'graphql-tag';

export const getMovies = gql
  `
  {
    movies{
      id,
      title
    }
  }
`;

export const getMovie = gql
  `
  query getMovie($id: ID!){
    movie(id: $id){
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

export const addMovie = gql
  `
  mutation AddMovie($title: String){
    addMovie(title: $title){
      id,
      title
    }
  }
`;

export const deleteMovie = gql
  `
  mutation DeleteMovie($id: ID){
    deleteMovie(id: $id){
      id, 
      title
    }
  }
`;
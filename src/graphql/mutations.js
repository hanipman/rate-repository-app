import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    authorize(credentials: {
      username: $username,
      password: $password
    }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation addReview($repo_owner_name: String!, $repo_name: String!, $rating: Int!, $review_description: String) {
    createReview(review: {
      repositoryName: $repo_name,
      ownerName: $repo_owner_name,
      rating: $rating,
      text: $review_description
    }) {
      id
      user {
        id
        username
      }
      repository {
        id
        ownerName
        name
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;
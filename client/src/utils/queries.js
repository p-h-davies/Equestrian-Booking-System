import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;


export const QUERY_LESSONS = gql`
  query getLessons {
    lessons {
      _id
      title
      date
      start
      end
    }
  }
`;

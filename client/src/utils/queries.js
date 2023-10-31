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

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      role
      lessons {
        _id
      }
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

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    addUser(username: $username, email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`



export const ADD_LESSON = gql`
  mutation addLesson($title: String!, $date: String!, $start: String!, $end: String!, $limit: String!) {
    addLesson(title: $title, date: $date, start: $start, end: $end, limit: $limit) {
       _id
       title
       date
       start
       end
       limit
    }
  }`

export const REMOVE_LESSONS = gql`
  mutation removeLessons {
    removeLessons {
      _id
    }
  }
`;

export const REMOVE_LESSON = gql`
  mutation removeLesson($lessonId: ID!) {
    removeLesson(lessonId: $lessonId) {
      _id
    }
  }
`;

export const CANCEL_LESSON = gql`
  mutation CancelLesson($lessonId: ID!) {
    cancelLesson(lessonId: $lessonId) {
      _id
      username
      lessons {
        _id
        date
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      firstName
      lastName
      password
      level
      role
    }
  }
`;

export const BOOK_LESSON = gql`
  mutation BookLesson($lessonId: ID!) {
    bookLesson(lessonId: $lessonId) {
      _id
      username
      email
      lessons {
        _id
        title
        date
        start
        end
      }
    }
  }
`;

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    firstName: String
    lastName: String
    password: String
    level: String
    lessons: [Lessons]!
  }

  type Lessons {
    _id: ID
    title: String!
    date: String!
    start: String!
    end: String!
    limit: String
    users: [User]!
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    lessons: [Lessons]
  }

  type Mutation {
    addUser(username: String!, email: String!, firstName: String!, lastName: String!, password: String!): Auth
    removeUser(userId: ID!): User
    login(email: String!, password: String!): Auth
    addLesson(title: String!, date: String!, start: String!, end: String!, limit: String!): Lessons
    removeLessons(title: String!): Lessons
    bookLesson(lessonId: ID!): User
  }
`;

module.exports = typeDefs;
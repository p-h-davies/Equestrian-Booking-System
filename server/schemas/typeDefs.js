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
    lessonType: String
    maxRiders: String
    time: String
    riders: [User]!
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
    addLesson(lessonType: String!, maxRiders: Int!, time: String!): Lessons
    removeLesson(lessonId: ID!): Lessons
  }
`;

module.exports = typeDefs;

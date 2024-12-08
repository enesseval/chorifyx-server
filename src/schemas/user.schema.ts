import { gql } from "apollo-server";

export const typeDefs = gql`
   type User {
      id: ID!
      name: String!
      surname: String!
      email: String!
      password: String!
   }

   type Query {
      users: [User]
   }

   type Mutation {
      addUser(name: String!, surname: String!, email: String!, password: String!): User
   }
`;

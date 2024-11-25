export const typeDefs = `#graphql
type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!,password: String! ): String,
   
  }

  type Query {
    getUsers: [User]
    getUserToken(email: String!, password: String!) : String
  }

   type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImageURL: String
  }
`;
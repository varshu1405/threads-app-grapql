import { ApolloServer } from '@apollo/server';
import { Users } from './users';
import { typeDefs } from './users/typedef';
async function createApolloServer() {
    // create apollo server

    // type Query {
    //     ${Users.queries}
    //   }
    //   type Mutation {
    //    ${Users.mutations}
    //   }

    const gqlserver = new ApolloServer({
        typeDefs: [
            Users.typeDefs,
        ],
        resolvers: {
            Query: {
                ...Users.resolvers.queries
            },
            Mutation: {
                ...Users.resolvers.mutations
            }
        },
    });
    // start gql server
    await gqlserver.start()

    return gqlserver;
}

export default createApolloServer
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
// import cors from 'cors';
import express from 'express';
import { prismaClient } from './lib/db';


async function init() {

    const app = express()
    const PORT = Number(process.env.PORT) || 8000
    app.use(express.json())

    // create apollo server

    const gqlserver = new ApolloServer({
        typeDefs: `
      type Query {
      hello : String
      say (name: String) : String
      }
       type Mutation {
         createUser(firstName: String!, lastName:String!, email: String!, password: String!): Boolean
       }
    `,
        resolvers: {
            Query: {
                hello: () => 'Hey there I am a gql server',
                say: (_, { name }: { name: string }) => `Hey ${name}, How are you`,
            },
            Mutation: {
                createUser: async(_, 
                    { firstName, 
                    lastName,
                    email,
                    password 
                }: { 
                    firstName: string, 
                    lastName: string, 
                    email: string, 
                    password: string 
                }) => {
                    await prismaClient.user.create({
                        data:{
                            firstName,
                            lastName,
                            email,
                            password,
                            salt:'random_salt'
                        }
                    })
                    return true
                }
            }
        },
    });

    // start gql server

    await gqlserver.start()

    app.get('/', (req, res) => {

        res.json({ message: "Server is Up and Running" })
    })

    app.use("/graphql", expressMiddleware(gqlserver))

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))

}

init()
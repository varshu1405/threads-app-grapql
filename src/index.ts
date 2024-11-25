
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import createApolloServer from './graphql';

async function init() {

    const gqlServer = await createApolloServer()
    const app = express()
    const PORT = Number(process.env.PORT) || 8000
    app.use(express.json())

    app.get('/', (req, res) => {

        res.json({ message: "Server is Up and Running" })
    })

    app.use("/graphql", expressMiddleware(gqlServer))
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))

}

init();
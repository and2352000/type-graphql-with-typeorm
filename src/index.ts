import 'reflect-metadata';
// import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import BookResolver from '@/resolver/book';
import AuthorResolver from '@/resolver/author';
const PORT = 4000;

async function bootstrap() {
  const dbConnection = await createConnection();

  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
  });

  const server = new ApolloServer({
    schema,
    context: {
      session: {},
    },
  });

  await server.start();
  const app = express();

  app.get('/health', async (req, res) => {
    try {
      if (dbConnection.isConnected) return res.send(true);
      return res.send(false);
    } catch (e) {
      console.error(e);
      return res.send(false);
    }
  });

  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise((resolve) =>
    app.listen({ port: PORT }, () => {
      resolve('ok');
      console.log(`🚀  Server ready at port=>${PORT}`);
    })
  );
}

bootstrap();

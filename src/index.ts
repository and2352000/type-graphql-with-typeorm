import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  buildSchema,
} from "type-graphql";

import BookResolver from "@/resolver/book";
import AuthorResolver from "@/resolver/author";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
  });
  
  const server = new ApolloServer({
    schema,
    context: {},
    onHealthCheck: () => {
      return new Promise((resolve, reject) => {
        // Replace the `true` in this conditional with more specific checks!
        if (true) {
          resolve("ok");
        } else {
          reject();
        }
      });
    },
  });
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}


bootstrap();
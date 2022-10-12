require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express, { Application } from "express";
import http from "http";
// import { schema } from "./graphql";
import { typeDefs, resolvers } from "./graphql/index";
import { connectDatabase } from "./database/index";

import { Database } from "./lib/types";

const mount = async (application: Application) => {
  const db = await connectDatabase();

  // const listings = await db.listings.find({}).toArray();
  // console.log(listings);

  // Required logic for integrating with Express
  const app = express();
  const port = process.env.PORT;

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: () => ({ db }),
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};

mount(express());

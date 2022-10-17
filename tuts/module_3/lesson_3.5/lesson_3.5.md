# Module 3 Summary

In Module 3, we've set up a GraphQL API with Apollo Server (in particular with the `apollo-express-server` package).

### `src/index.ts`

In the main `src/index.ts` file, we set up a new Apollo Server instance with the `ApolloServer` constructor. In the `ApolloServer` constructor, we pass in a `typeDefs` string and a `resolvers` map that we've created in the `src/graphql/` folder of our app.

We applied middleware on the Apollo Server instance and passed in the Express `app` instance as well as specified the path of our API endpoint to be `/api`.

```typescript
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";

const app = express();
const port = 9000;
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });
app.listen(port);

console.log(`[app] : http://localhost:${port}`);
```

### GraphQL Schema

`typeDefs` (i.e. type definitions) is a string that represents the GraphQL schema. In the `src/graphql/typeDefs.ts` file, we use the `gql` tag that `apollo-server-express` provides to help parse a template literal into a GraphQL Abstract Tree.

We created a `Listing` GraphQL object type that represents the shape of a single listing. We also created the root `Query` and `Mutation` object types. In the root `Query` type, we established a `listings` field where we return a list of listings. The `deleteListing` field in our `Mutation` object accepts an `id` argument and when complete returns the deleted listing.

```typescript
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  type Query {
    listings: [Listing!]!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }
`;
```

### GraphQL Resolvers

The implementation of our GraphQL schema is set up in the `src/graphql/resolvers.ts` file which contains the resolvers of our GraphQL API in a `resolvers` map.

We've specified the `listings` resolver in our `Query` object to return the `listings` mock data array. The resolver for the `deleteListing` field within our `Mutation` object accepts an `id` argument and loops through the `listings` mock array to remove the `listing` where `listing.id` matches the `id` argument passed in.

```typescript
import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    }
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error("failed to deleted listing");
    }
  }
};
```

### Moving forward

Whenever our server app restarts, all the listings we delete come back. This is because we've _hard-coded_ data into our app in the `src/listings.ts` file. Whenever our server restarts, the code in `src/listings.ts` is reloaded into our computer memory. For a real application, this makes our server pretty useless.

If we want our actions to be permanent, we must somehow persist our modified data outside of our app. Databases are designed to do just this with which we'll be discussing in the next module of the course. Great job so far!

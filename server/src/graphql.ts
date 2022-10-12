import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const query = new GraphQLObjectType({
  name: "query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from query!",
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from mutation!",
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });

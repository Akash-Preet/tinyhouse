# Installing Apollo Server and GraphQL

We've mentioned that the GraphQL specification _isn't_ tied to any specific technology. We've also talked about one of the popular suite of tools in the GraphQL ecosystem, [Apollo](https://www.apollographql.com/).

[Apollo Server](https://www.apollographql.com/docs/apollo-server/) is one of the libraries within the Apollo framework and its responsibility is to help build a GraphQL API within Node applications. Apollo Server enables us to connect a GraphQL schema to a server and can be used to spin up a stand-alone server, be an add-on to an existing Node server, or even work within "serverless" environments. We'll go with the approach of adding Apollo Server to our existing Node/Express server.

### apollo-server-express

To add Apollo Server to an existing Node/Express server project, we'll install the `apollo-server-express` library.

```shell
npm install apollo-server-express
```

[`apollo-server-express`](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) is a TypeScript project so we won't have to install an additional type declaration file for it.

### graphql

To use Apollo Server, we'll need to install another dependency into our app. We'll need to install the [`graphql`](https://github.com/graphql/graphql-js) JavaScript library. This is because the `graphql` library is a peer dependency of the Apollo Server package. In addition, the `graphql` library will also be used in our first attempt to build our schema.

We'll install the `graphql` library as an application dependency.

```shell
npm install graphql
```

The `graphql` library doesn't have its own type definitions, so we'll need to install the corresponding type declaration file (`@types/graphql`).

```shell
npm install -D @types/graphql
```

These are the only additional libraries we'll need to begin developing our GraphQL Schema!

# Module 3 Introduction

We have an understanding of how GraphQL is a typed query language that allows client-side applications to request the data they want. With that said, how would one go about creating a GraphQL API?

**GraphQL is a specification, not a direct implementation**. This means GraphQL can be implemented in multiple programming languages. In our case, we'll be using [Apollo](https://www.apollographql.com/) to create our API.

In particular, we'll be using the [Apollo Server](https://www.apollographql.com/docs/apollo-server/) package, which is the server package within the Apollo ecosystem. Apollo Server allows us to create a production-ready, self-documenting, GraphQL API in Node applications. It's really easy to get started with and incrementally adoptable.

In this module, we'll:

- Install Apollo Server and the GraphQL JavaScript library.
- Create a GraphQL Schema.
- Build GraphQL resolver functions to interact with our mock data.
- Finally, recreate our schema with the much simpler GraphQL Schema Language.

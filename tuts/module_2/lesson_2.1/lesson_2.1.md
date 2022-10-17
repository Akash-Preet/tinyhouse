# What is GraphQL?

What we've built so far with our Node app conforms to what a REST (which stands for REpresentation State Transfer) API is. In traditional REST APIs, the client can interact with the server by accessing various endpoints to `GET`, `POST`, `PUT`, or `DELETE` data while leveraging the HTTP protocol.

To get all the listings in our app, we had to make a request to the `/listings` endpoint. If we wanted our server to serve data for just one listing, we could implement a `/listing/:id` endpoint (where `:id` is the dynamic `id` value of a certain listing). If we had mock user data, we could implement a `/users` endpoint to return all users or a `/user/:id` endpoint to serve user data for a certain user.

Now, let’s consider an example scenario. What if a client app needs to display some user information plus all the listings for that user. This client doesn’t have to be ours, someone else could have developed a web or mobile app that interacts with our API. How could this scenario play out with REST?

With an example REST API, the client could make a request to a `/user/:id` endpoint to fetch the initial user data.

```shell
1. `/user/:id` - to fetch certain user data
```

Then the client could make a second request to something like a `/user/:id/listings` endpoint to return all the listings for that user.

```shell
1. `/user/:id` - to fetch certain user data
2. `/user/:id/listings` - to fetch listings for certain user
```

So far, this isn't too bad since we're only making two requests. With that said, how would GraphQL fare here?

## GraphQL

[GraphQL](https://graphql.org/) is a query language for making requests to APIs. With GraphQL, the client tells the server _exactly what it needs_ and the server responds with the data that has been requested.

Here's an example query of attempting to retrieve some `user` information of a certain `id`.

```graphql
query User($id: ID!) {
  user(id: $id) {
    id
    name
    listings {
      id
      title
    }
  }
}
```

When querying the `user` with the example above, we can specify what fields we want to be returned from our API. Above, we've stated we're interested in receiving the `id`, `name`, and `listings` information of the user. For the listings that are to be returned, we're only interested in receiving the `id` and `title` of each listing.

GraphQL is a _typed_ language. Before we tell our GraphQL API how we want each field in our API to be resolved, we'll need to tell GraphQL the _type_ of each of the fields.

```graphql
type User {
  id: ID!
  name: String!
  listings: [Listing!]!
}
```

GraphQL allows for some significant benefits. GraphQL APIs are:

- **Intuitive**: The client can specify exactly what data it needs thus making the code intuitive and easy to understand.
- **Performant**: Since no useless data needs to be transferred, reduced latency will make an app feel faster which is especially important for slower internet connections.
- **Typed**: GraphQL uses a type system of its own to validate requests. This integrates _beautifully_ with TypeScript to create a robust statically typed application.

GraphQL APIs are also:

- **self-documenting**.
- encourage the use of **GraphQL [IDEs](https://github.com/prisma/graphql-playground)**.
- and consist of a **single endpoint**.

GraphQL isn't tied to any specific technology. This is because GraphQL is a [_specification_](https://graphql.github.io/graphql-spec/), not a direct implementation. The community has created server implementations and client libraries to create and consume a GraphQL API for a variety of different technologies.

**Server libraries**

- Apollo Server | **Node Frameworks** - [Github](https://github.com/apollographql/apollo-server)
- GraphQL Java | **Java** - [Github](https://github.com/graphql-java/graphql-java)
- GraphQL Ruby | **Ruby** - [Github](https://github.com/rmosolgo/graphql-ruby)
- [and a lot more...](https://graphql.org/code/#server-libraries)

**Client libraries**

- Apollo Client | **React, Vue, etc.** - [Github](https://github.com/apollographql/apollo-client)
- GraphQL Python | **Python** - [Github](https://github.com/graphql-python/gql)
- GraphQL.Client | **.NET** - [Github](https://github.com/graphql-dotnet/graphql-client)
- [and a lot more...](https://graphql.org/code/#graphql-clients)

In the next lesson, we'll go through an example-driven approach to compare a real REST & GraphQL API. We'll be using the [Github API](https://developer.github.com/) that has been made publicly available.

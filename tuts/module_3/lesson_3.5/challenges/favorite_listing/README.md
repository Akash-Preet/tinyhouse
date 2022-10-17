![](./assets/tinyhouse-challenge-banner.png)

# Favorite Listing Challenge

This challenge is part of the larger project challenge, **Favorite a listing**, in the [TinyHouse](https://www.newline.co/tinyhouse) full-stack React Masterclass. By completing this series of challenges, you'll build a simple full-stack web app that allows you to request a list of listings where you're also able to favorite and unfavorite listings. This challenge project will involve work that is to be done with Node, MongoDB, GraphQL, and React.

![](./assets/favoriting-listings.gif)

This directory contains the starting scaffold for you to use as well as the completed solution.

Below, we'll specify the challenge requirements, describe the functionality we intend to have, and give you tips along the way.

## Challenge Details - `favoriteListing` mutation

### Starting point

At the starting `/scaffold`, we're able to request a series of listing objects by making a GET request to the path of `/listings`. This listing data comes from mock data created in a `listings.ts` file within the `src/` directory of the `server/` project.

![`/listings`](./assets/get-listings.png)

A POST request can be made to the `/favorite-listing` route while passing in an `id` argument value of a certain listing to "favorite" the intended listing.

> Favoriting in this context refers to toggling the `favorite` boolean of a listing object to the value of `true`.

```typescript
const listings = [
  {
    // ...,
    id: "001",
    favorite: false // listing object of id "001" in unfavorited state
  }
  // ...
];

// POST request to `/favorite-listing` and passing in an "id" argument value of "001"

const listings = [
  {
    // ...,
    id: "001",
    favorite: true // listing object of id "001" in favorited state
  }
  // ...
];
```

Making a POST request to the `/favorite-listing` route and passing an `id` argument value of an already favorited listing, will have the `favorite` boolean value of the `listing` object be toggled back to `false`.

```typescript
const listings = [
  {
    // ...,
    id: "001",
    favorite: true // listing object of id "001" in favorited state
  }
  // ...
];

// POST request to `/favorite-listing` and passing in an "id" argument value of "001"

const listings = [
  {
    // ...,
    id: "001",
    favorite: false // listing object of id "001" in unfavorited state
  }
  // ...
];
```

### Requirements

**In this challenge, we'll focus on converting our REST API into a GraphQL API using Apollo Server.**

Create a GraphQL schema with the root-level fields, `listings` (query) and `favoriteListing` (mutation).

```gql
type Listing {
  ...
}

type Query {
  listings: [Listing!]!
}

type Mutation {
  favoriteListing(id: ID!): Listing!
}
```

Create a resolver for each of the root-level fields:

- `Query.listings` should return all the listings in our server's memory.
- `Mutation.favoriteListing` should favorite a listing if it is not favorited, and unfavorite a listing if it is already favorited. Ideally, the modified listing should be returned as well.

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. When your server is running, navigate to http://localhost:9000/api to test out your API in the GraphQL Playground.

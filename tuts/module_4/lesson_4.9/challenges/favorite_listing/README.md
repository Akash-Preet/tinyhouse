![](./assets/tinyhouse-challenge-banner.png)

# Favorite Listing Challenge

This challenge is part of the larger project challenge, **Favorite a listing**, in the [TinyHouse](https://www.newline.co/tinyhouse) full-stack React Masterclass. By completing this series of challenges, you'll build a simple full-stack web app that allows you to request a list of listings where you're also able to favorite and unfavorite listings. This challenge project will involve work that is to be done with Node, MongoDB, GraphQL, and React.

![](./assets/favoriting-listings.gif)

This directory contains the starting scaffold for you to use as well as the completed solution.

Below, we'll specify the challenge requirements, describe the functionality we intend to have, and give you tips along the way.

## Challenge Details

### Starting point

At the starting `/scaffold`, a GraphQL API exists where we're able to query for a series of listings with the root level `listings` field and favorite a certain listing by passing a listing `id` argument value and executing the `favoriteListing` mutation. The schema for our GraphQL API looks like the following:

```gql
type Listing {
  id: ID!
  title: String!
  image: String!
  address: String!
  price: Int!
  numOfGuests: Int!
  numOfBeds: Int!
  numOfBaths: Int!
  rating: Float!
  favorite: Boolean!
}

type Query {
  listings: [Listing!]!
}

type Mutation {
  favoriteListing(id: ID!): Listing!
}
```

Our GraphQL API interacts with a mock listings collection/array that is to be kept in our computer memory and is created in a `listings.ts` file within the `src/` folder of our `server/` project. Whenever we are to restart our server, any of the changes we make is _not persisted_ and the listings collection is back at its original state.

### Requirements

**In this challenge, we'll focus on integrating a Cloud MongoDB database to persist the modifications we make to the listings collection.**

1. Make a MongoDB Atlas connection to our server. _Ensure that the collection name specified in our server is different from the one that is used for the video lessons. For example:_

```
listings: db.collection("part_1_challenge_1_listings")
```

2. Create a seed script in the `package.json` file that will allow you to seed the MongoDB collection with a `listings` array.

3. Update the resolvers in our GraphQL API to interact with and persist changes to the MongoDB collection.

4. Attempt to modularize the resolver functions to a certain module with the help of the Lodash [`merge()`](https://lodash.com/docs/#merge) utility function.

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. Just like the video lessons, we strongly encourage you to always keep database configuration variables in a `.env` file. In fact, you may use the same `.env` file as the video lessons as long as you followed requirement #1 from above.

2. MongoDB document objects often have a `_id` field of type `ObjectId`. You may need to create a resolver function for the `id` field of the `Listing` object to convert the `_id` field received from MongoDB to an `id` field of type GraphQL `ID`.

![](./assets/tinyhouse-challenge-banner.png)

# Book Listing Challenge

This challenge is part of the larger project challenge, **Book a listing**, in the [TinyHouse](https://www.newline.co/tinyhouse) full-stack React Masterclass. By completing this series of challenges, you'll build a simple full-stack web app that allows you to book a listing from a list of listings.

Booking, in this context, refers to capturing the timestamp in which the booking was made and have the booking details be shown in a list of bookings.

This challenge project will involve work that is to be done with Node, MongoDB, GraphQL, and React.

![](./assets/booking-listings.gif)

This directory contains the starting scaffold for you to use as well as the completed solution.

Below, we'll specify the challenge requirements, describe the functionality we intend to have, and give you tips along the way.

## Challenge Details

### Starting point

At the starting `/scaffold`, a GraphQL API exists where we're able to:

- Query for a series of listings with the root level `listings` field.
- Book a certain listing by passing a listing `id` argument value and the current timestamp while executing the `createBooking` mutation.
- Query for the bookings that have been made with the `bookings` field.

```gql
type Booking {
  id: ID!
  title: String!
  image: String!
  address: String!
  timestamp: String!
}

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
  numOfBookings: Int!
}

type Query {
  bookings: [Booking!]!
  listings: [Listing!]!
}

type Mutation {
  createBooking(id: ID!, timestamp: String!): Booking!
}
```

Our GraphQL API interacts with mock listings and bookings collections/arrays that are kept in our computer memory and created in a `listings.ts` and `bookings.ts` files within the `src/` folder of our `server/` project. Whenever we are to restart our server, any of the changes we make is _not persisted_ and the listings and bookings collections are brought back to their original state.

### Requirements

**In this challenge, we'll focus on integrating a Cloud MongoDB database to persist the modifications we make.**

1. Make a MongoDB Atlas connection to our server. _Ensure that the collection names specified in our server is different from the one that is used for the video lessons. For example:_

```
bookings: db.collection("part_1_challenge_2_bookings")
listings: db.collection("part_1_challenge_2_listings")
```

2. Create a seed script in the `package.json` file that will allow you to seed the listings collection with the `listings` data array prepared in our server code.

3. Update the resolvers in our GraphQL API to interact with and persist changes to the MongoDB collection.

4. Attempt to modularize the resolver functions to separate modules (e.g. `listingResolvers` and `bookingResolvers`) with the help of the Lodash [`merge()`](https://lodash.com/docs/#merge) utility function.

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. Just like the video lessons, we strongly encourage you to always keep database configuration variables in a `.env` file. In fact, you may use the same `.env` file as the video lessons as long as you followed requirement #1 from above.

2. MongoDB document objects often have a `_id` field of type `ObjectId`. You may need to create resolver functions for the `id` field of the `Listing` and `Booking` object to convert the `_id` field received from MongoDB to an `id` field of type GraphQL `ID`.

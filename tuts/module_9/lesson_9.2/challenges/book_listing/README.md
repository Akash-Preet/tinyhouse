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

The root-level `listings`, `bookings`, and `createBooking` fields interact and manipulate data that is kept in MongoDB collections within a database constructed with the help of MongoDB Atlas.

> To begin working with the `server/` project in the `scaffold/` directory, ensure the collection being interacted is the name that you've established and provide values for the appropriate database configuration variables.

With the `server/` project running, the `client/` project in the `scaffold/` has been prepared to have the `listings` query be made and the `listings` data retrieved be surfaced the moment client application is run.

![](./assets/listings-query.png)

### Requirements

**In this challenge, we'll focus on modifying our React client to allow a user to book a listing in the list displayed in the UI.**

1. Create the following UI elemnets.

   - Display a button to book a listing using the `createBooking` mutation.
   - When the book button is pressed, the affected listing must show the updated number of times it has been booked.
   - Update the UI to visually show all the bookings under the listings.

![React_UI](./assets/react-ui-solution.png)

2. When the `Book` button is pressed, the lisitng & booking data must be refreshed automatically such that the UI is in sync with the database.

3. Ensure the client handles all loading and error states from our GraphQL requests. You're welcome to handle these states as you prefer. In the `solution/` we've managed our loading and error states as follows:

![](./assets/loading-and-error-states.png)

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. You'll need to create the `createBooking` mutation request document in the React client and have the `Book` button trigger the `createBooking` mutation.

2. You'll need to create the `bookings` query in the React client and have the UI automatically execute this query on first render and subsequent booking creation.

3. To auto-generate TypeScript definitions from the GraphQL API, you can run the `codegen:schema` and `codegen:generate` script commands available in the `client/` project.

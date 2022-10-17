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

At the starting `/scaffold`:

We're able to request a list of listing objects by making a GET request to the path of `/listings`. This listing data comes from mock data created in a `listings.ts` file within the `src/` directory of the `server/` project.

![`/listings`](./assets/get-listings.png)

We're able to book a certain listing by making a POST request to the path of `/create-booking` and pass along the `id` of the listing being booking and the current timestamp (both in string formats). Booking a listing adds the new booking object to a bookings data array being kept in a `bookings.ts` file within the `src/` directory of the `server/` project.

```shell
curl -X POST http://localhost:9000/create-booking \
    -H 'Content-Type: application/json' \
    -d '{"id":"001","timestamp":"01/01/2020, 9:00:00 AM"}'
```

We're able to request a list of the booking objects that have been made by making a GET request to the path of `/bookings`.

![`/bookings`](./assets/get-bookings.png)

### Requirements

**In this challenge, we'll focus on converting our REST API into a GraphQL API using Apollo Server.**

Create a GraphQL schema with the root-level fields, `bookings` (query), `listings` (query), and `createBooking` (mutation).

```
type Booking {
  ...
}

type Listing {
  ...
}

type Query {
  bookings: [Booking!]!
  listings: [Listing!]!
}

type Mutation {
  createBooking(id: ID!, timestamp: String!): Booking!
}
```

Create a resolver for each of the root-level fields:

- `Query.bookings` should return all the bookings in our server's memory
- `Query.listings` should return all the listings in our server's memory
- `Mutation.createBooking` should create a booking when a listing `id` of type `ID!` and a `timestamp` of type `String!` is provided. Ideally, the created booking object should be returned as well.

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. When your server is running, navigate to http://localhost:9000/api to test out your API in the GraphQL Playground.

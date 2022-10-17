import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
`;

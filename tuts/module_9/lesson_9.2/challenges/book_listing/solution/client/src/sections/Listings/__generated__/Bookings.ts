/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Bookings
// ====================================================

export interface Bookings_bookings {
  __typename: "Booking";
  id: string;
  title: string;
  image: string;
  address: string;
  timestamp: string;
}

export interface Bookings {
  bookings: Bookings_bookings[];
}

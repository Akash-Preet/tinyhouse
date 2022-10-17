import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Alert, Spin } from "antd";
import { Bookings as BookingsData } from "./__generated__/Bookings";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsBookings, ListingsList, ListingsSkeleton } from "./components";
import {
  CreateBooking as CreateBookingData,
  CreateBookingVariables
} from "./__generated__/CreateBooking";
import "./styles/Listings.css";

const BOOKINGS = gql`
  query Bookings {
    bookings {
      id
      title
      image
      address
      timestamp
    }
  }
`;

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
      numOfBookings
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($id: ID!, $timestamp: String!) {
    createBooking(id: $id, timestamp: $timestamp) {
      id
    }
  }
`;

export const Listings = () => {
  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
    refetch: bookingsRefetch
  } = useQuery<BookingsData>(BOOKINGS);

  const {
    data: listingsData,
    loading: listingsLoading,
    error: listingsError,
    refetch: listingsRefetch
  } = useQuery<ListingsData>(LISTINGS);

  const [
    createBooking,
    { loading: createBookingLoading, error: createBookingError }
  ] = useMutation<CreateBookingData, CreateBookingVariables>(CREATE_BOOKING);

  const handleCreateBooking = async (id: string) => {
    await createBooking({
      variables: { id, timestamp: new Date().toLocaleString() }
    });
    bookingsRefetch();
    listingsRefetch();
  };

  const bookings = bookingsData ? bookingsData.bookings : null;
  const listings = listingsData ? listingsData.listings : null;

  const listingsBookings = bookings ? (
    <ListingsBookings bookings={bookings} />
  ) : null;

  const listingsList = listings ? (
    <ListingsList
      listings={listings}
      handleCreateBooking={handleCreateBooking}
    />
  ) : null;

  if (bookingsLoading || listingsLoading) {
    return (
      <div className="app">
        <ListingsSkeleton title="TinyHouse Listings" />
      </div>
    );
  }

  if (bookingsError || listingsError) {
    return (
      <div className="app">
        <ListingsSkeleton title="TinyHouse Listings" error />
      </div>
    );
  }

  const createBookingErrorAlert = createBookingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong :(. Please try again later."
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="app">
      {createBookingErrorAlert}
      <Spin spinning={createBookingLoading}>
        {listingsList}
        {listingsBookings}
      </Spin>
    </div>
  );
};

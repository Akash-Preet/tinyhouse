import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsList, ListingsSkeleton } from "./components";

import "./styles/Listings.css";

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
    }
  }
`;

export const Listings = () => {
  const {
    data: listingsData,
    loading: listingsLoading,
    error: listingsError
  } = useQuery<ListingsData>(LISTINGS);

  const listings = listingsData ? listingsData.listings : null;
  const listingsList = listings ? <ListingsList listings={listings} /> : null;

  if (listingsLoading) {
    return (
      <div className="app">
        <ListingsSkeleton title="TinyHouse Listings" />
      </div>
    );
  }

  if (listingsError) {
    return (
      <div className="app">
        <ListingsSkeleton title="TinyHouse Listings" error />
      </div>
    );
  }

  return <div className="app">{listingsList}</div>;
};

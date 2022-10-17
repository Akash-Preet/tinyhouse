import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Avatar, List } from "antd";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsSkeleton } from "./components";
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
  const { data, loading, error } = useQuery<ListingsData>(LISTINGS);

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={listing => (
        <List.Item>
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title="TinyHouse Listings" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title="TinyHouse Listings" error />
      </div>
    );
  }

  return (
    <div className="listings">
      <h2>TinyHouse Listings</h2>
      {listingsList}
    </div>
  );
};

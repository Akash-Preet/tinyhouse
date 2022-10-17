import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Alert, Avatar, Button, List, Spin } from "antd";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsSkeleton } from "./components";
import {
  FavoriteListing as FavoriteListingData,
  FavoriteListingVariables
} from "./__generated__/FavoriteListing";
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
      favorite
    }
  }
`;

const FAVORITE_LISTING = gql`
  mutation FavoriteListing($id: ID!) {
    favoriteListing(id: $id) {
      id
    }
  }
`;

export const Listings = () => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    favoriteListing,
    { loading: favoriteListingLoading, error: favoriteListingError }
  ] = useMutation<FavoriteListingData, FavoriteListingVariables>(
    FAVORITE_LISTING
  );

  const handleFavoriteListing = async (id: string) => {
    await favoriteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={listing => {
        const buttonText = listing.favorite ? "Unfavorite" : "Favorite";
        const heartIcon = listing.favorite ? (
          <span role="img" aria-label="heart">
            ❤️
          </span>
        ) : null;

        return (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => handleFavoriteListing(listing.id)}
              >
                {buttonText}
              </Button>
            ]}
          >
            <List.Item.Meta
              title={listing.title}
              description={listing.address}
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
            />
            {heartIcon}
          </List.Item>
        );
      }}
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

  const listingErrorAlert = favoriteListingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong :(. Please try again later."
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="listings">
      {listingErrorAlert}
      <Spin spinning={favoriteListingLoading}>
        <h2>TinyHouse Listings</h2>
        {listingsList}
      </Spin>
    </div>
  );
};

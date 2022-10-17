import React from "react";
import { Avatar, Button, List } from "antd";
import { Listings as ListingsData } from "../../__generated__/Listings";

interface Props {
  listings: ListingsData["listings"];
  handleCreateBooking: (id: string) => void;
}

export const ListingsList = ({ listings, handleCreateBooking }: Props) => {
  return (
    <div className="listings-section">
      <h2>TinyHouse Listings</h2>
      <List
        itemLayout="horizontal"
        dataSource={listings}
        renderItem={listing => {
          const numberOfTimesListingBooked = listing.numOfBookings ? (
            <span>{listing.numOfBookings}× booked</span>
          ) : null;

          return (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleCreateBooking(listing.id)}
                >
                  Book
                </Button>
              ]}
            >
              <List.Item.Meta
                title={listing.title}
                description={listing.address}
                avatar={<Avatar src={listing.image} shape="square" size={48} />}
              />
              <div>{numberOfTimesListingBooked}</div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

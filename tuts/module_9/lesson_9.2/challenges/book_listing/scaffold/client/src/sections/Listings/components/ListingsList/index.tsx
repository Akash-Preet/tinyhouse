import React from "react";
import { Avatar, List } from "antd";
import { Listings as ListingsData } from "../../__generated__/Listings";

interface Props {
  listings: ListingsData["listings"];
}

export const ListingsList = ({ listings }: Props) => {
  return (
    <div className="listings-section">
      <h2>TinyHouse Listings</h2>
      <List
        itemLayout="horizontal"
        dataSource={listings}
        renderItem={listing => {
          return (
            <List.Item>
              <List.Item.Meta
                title={listing.title}
                description={listing.address}
                avatar={<Avatar src={listing.image} shape="square" size={48} />}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

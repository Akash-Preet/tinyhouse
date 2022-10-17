import React from "react";
import { Avatar, List } from "antd";
import { Bookings as BookingsData } from "../../__generated__/Bookings";

interface Props {
  bookings: BookingsData["bookings"];
}

export const ListingsBookings = ({ bookings }: Props) => {
  return (
    <div className="listings-section">
      <h2>Your Bookings</h2>
      <List
        itemLayout="horizontal"
        dataSource={bookings}
        renderItem={bookings => (
          <List.Item>
            <List.Item.Meta
              title={bookings.title}
              description={bookings.address}
              avatar={<Avatar src={bookings.image} shape="square" size={48} />}
            />
            <div>{bookings.timestamp}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

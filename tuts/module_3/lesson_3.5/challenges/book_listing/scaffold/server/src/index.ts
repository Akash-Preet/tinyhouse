import express from "express";
import bodyParser from "body-parser";
import { Booking, bookings } from "./bookings";
import { listings } from "./listings";

const app = express();
const port = 9000;

let numOfBookings = 0;

app.use(bodyParser.json());

app.get("/listings", (_req, res) => {
  res.send(listings);
});

app.get("/bookings", (_req, res) => {
  res.send(bookings);
});

app.post("/create-booking", (req, res) => {
  const id: string = req.body.id;
  const timestamp: string = req.body.timestamp;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      numOfBookings++;

      const newBooking: Booking = {
        id: numOfBookings.toString(),
        title: listings[i].title,
        image: listings[i].image,
        address: listings[i].address,
        timestamp
      };

      bookings.push(newBooking);
      listings[i].bookings.push(newBooking.id);

      return res.send(newBooking);
    }
  }

  return res.send("failed to create booking");
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);

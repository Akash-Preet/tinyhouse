![](./assets/tinyhouse-challenge-banner.png)

# Book Listing Challenge

This challenge is part of the larger project challenge, **Book a listing**, in the [TinyHouse](https://www.newline.co/tinyhouse) full-stack React Masterclass. By completing this series of challenges, you'll build a simple full-stack web app that allows you to book a listing from a list of listings.

Booking, in this context, refers to capturing the timestamp in which the booking was made and have the booking details be shown in a list of bookings.

This challenge project will involve work that is to be done with Node, MongoDB, GraphQL, and React.

![](./assets/booking-listings.gif)

This directory contains the starting scaffold for you to use as well as the completed solution.

Below, we'll specify the challenge requirements, describe the functionality we intend to have, and give you tips along the way.

## Challenge Details

### Starting point

At the starting `/scaffold`, we're able to request a series of listing objects by making a GET request to the path of `/listings`. This listing data comes from mock data created in a `listings.ts` file within the `src/` directory of the `server/` project.

![`/listings`](./assets/get-listings.png)

### Requirements

**In this challenge, we'll focus on creating two new RESTful endpoints - `/create-booking` and `/bookings`. When a POST request is made to the `/create-booking` route, a new booking will be made for a certain listing. When a GET request is made to the `/bookings` route, all the bookings that have been created will be returned.**

1. Create a `/create-booking` route that can accept a POST request and receive two arguments:

- The listing **`id`** of type string of the listing the booking is to be made for.
- The **`timestamp`** for the current time a booking is made.

An example of the `/create-booking` POST request can look something like the following with `curl`:

```shell
curl -X POST http://localhost:9000/create-booking \
    -H 'Content-Type: application/json' \
    -d '{"id":"001","timestamp":"01/01/2020, 9:00:00 AM"}'
```

2. The booking object that is to be created with the `/create-booking` should have the following shape (**NOTE: each booking object MUST have an unique ID value**):

```
export interface Booking {
  id: string;
  title: string;
  image: string;
  address: string;
  timestamp: string;
}
```

3. When a booking is made for a certain listing, update the `bookings` field within a listing document/object to then contain the `id` value of the booking that has been created.

4. Finally, create a `/bookings` route for when a GET request is made, all the bookings that have been made is returned.

> In this exercise, no data is retrieved or managed from a persistent database. All "bookings" functionality should interact with a simple collection/array that is to be kept in memory.

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. Since this exercise doesn't involve with storing data in a persisted database, store the bookings data in a seperate collection/array in memory.

2. To verify if your POST requests work as intended, make a GET request to the `/listings` route (e.g. by going to http://localhost:9000/listings in your browser) to retrieve all listing data.

3. To retrieve the list of bookings that have been made, make a GET request to the created `/bookings` route (e.g. by going to http://localhost:9000/bookings in your browser).

4. You can get the timestamp of the current data in string format with `new Date().toLocaleString()`.

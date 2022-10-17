![](./assets/tinyhouse-challenge-banner.png)

# Favorite a listing

This challenge is part of the larger project challenge, **Favorite a listing**, in the [TinyHouse](https://www.newline.co/tinyhouse) full-stack React Masterclass. By completing this series of challenges, you'll build a simple full-stack web app that allows you to request a list of listings where you're also able to favorite and unfavorite listings. This challenge project will involve work that is to be done with Node, MongoDB, GraphQL, and React.

![](./assets/favoriting-listings.gif)

This directory contains the starting scaffold for you to use as well as the completed solution.

Below, we'll specify the challenge requirements, describe the functionality we intend to have, and give you tips along the way.

## Challenge Details - POST `favorite-listing/`

### Starting point

At the starting `/scaffold`, we're able to request a series of listing objects by making a GET request to the path of `/listings`. This listing data comes from mock data created in a `listings.ts` file within the `src/` directory of the `server/` project.

![`/listings`](./assets/get-listings.png)

### Requirements

**In this challenge, we'll focus on creating a route that when a POST request is made to will favorite/unfavorite a certain listing.**

We're interested in having an additional RESTful route labeled `/favorite-listing` that when a POST request is made to "favorites" a certain listing. When a POST request is made to the `/favorite-listing' route for an already favorited listing, the request should "unfavorite" the intended listing.

An example of the `/favorite-listing` POST request can look something like the following with `curl`:

```shell
curl -X POST http://localhost:9000/favorite-listing \
    -H 'Content-Type: application/json' \
    -d '{"id":"001"}'
```

## Instructions

How to attempt this challenge:

1. Clone this repo
2. Solve the challenge
3. Compare your solution with the `solution/` folder provided in this directory

If you feel stuck at any moment in time, feel free to hop over and ask a question in the **`#tinyhouse`** channel of the Newline Discord organization!

## Tips

1. How do we know when a listing is in the "favorited" state? You might need to modify the existing `Listing` type interface and current mock data to recognize if a listing is favorited or not.

2. To verify if your POST requests work as intended, make a GET request to the `/listings` route (e.g. by going to `http://localhost:9000/listings in your browser) to retrieve all listing data.

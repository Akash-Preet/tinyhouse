# Module 4 Summary

In this module, we've established a connection between our Node server and the Mongo database with which we've created and set up in a database as a service known as MongoDB Atlas. Our database credentials are declared in a `.env` file to decouple environment-specific configuration and application code as well as to avoid committing our database configuration as part of our source code.

In the `temp/seed.ts` file, we've created a seed script that will help populate our database with three mock listings whenever the application `seed` script is run.

```typescript
require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Listing } from "../src/lib/types";

const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    const listings: Listing[] = [
      {
        _id: new ObjectId(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 10000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5
      },
      {
        _id: new ObjectId(),
        title: "Luxurious home with private pool",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
        address: "100 Hollywood Hills Dr, Los Angeles, California",
        price: 15000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4
      },
      {
        _id: new ObjectId(),
        title: "Single bedroom located in the heart of downtown San Fransisco",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
        address: "200 Sunnyside Rd, San Fransisco, California",
        price: 25000,
        numOfGuests: 3,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3
      }
    ];

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    console.log("[seed] : success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
```

In the `src/database/index.ts` file, we've created a `connectDatabase()` function that makes the connection between our Node server and the Mongo cluster in MongoDB Atlas. We've used the official [Node Mongo Driver](https://mongodb.github.io/node-mongodb-native/) to make our connection. Our `connectDatabase()` function returns an object of the collections we want our Node server to interact. As of this moment, we only have the single listings collection with which we've named as `test_listings` in our cluster.

```typescript
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db("main");

  return {
    listings: db.collection("test_listings")
  };
};
```

We've introduced TypeScript generics and with the capability of abstracting type information with the type definitions of the Node Mongo Driver, we've been able to define the type of data that can be returned from the listings collection.

```typescript
import { Collection, ObjectId } from "mongodb";

export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Database {
  listings: Collection<Listing>;
}
```

Our `listings` and `deleteListing` GraphQL resolvers interact with the MongoDB Database to either retrieve the list of listings in the listings collection OR delete a listing completely from the listings collection.

```typescript
import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error("failed to delete listing");
      }

      return deleteRes.value;
    }
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString()
  }
};
```

We've modularized our resolvers with the help of the [`lodash.merge` method](https://lodash.com/docs/4.17.15#merge) which helps us break our resolvers map function to specific modules.

### Moving forward

We've spent our entire time building the GraphQL API from a Node server. Moving forward, we'll be focusing on the client portion of our app by introducing [React](http://reactjs.org), creating a React TypeScript project with the [`create-react-app` command line](https://github.com/facebook/create-react-app), and building a simple UI that will allow a user to query the listings from our API and delete a listing of their choice.

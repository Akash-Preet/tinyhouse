# Module 1 Summary

This lesson is a summary of what we've done in Module 1.0.

In Module 1.0, we've built a very simple Node/Express/Typescript project.

### `package.json`

In the `package.json` file of our app, we can see the `dependencies` and `devDependencies` our app depends on. `body-parser` and the `express` packages are our app's main dependencies. In our development dependencies, we've introduced the TypeScript ESLint packages, the `eslint` package, `nodemon`, and `typescript`. We've introduced two scripts in our app; the `start` script which allows us to start the server and the `build` script which allows us to compile our TypeScript code to valid JavaScript.

```json
{
  "name": "tinyhouse-v1-server",
  "version": "0.1.0",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "@types/body-parser": "^1.17.0",
    "@types/express": "^4.17.0",
    "@types/node": "^12.0.10",
    "@typescript-eslint/eslint-plugin": "^1.11.0",
    "@typescript-eslint/parser": "^1.11.0",
    "eslint": "^6.0.1",
    "nodemon": "^1.19.1",
    "ts-node": "^8.3.0",
    "typescript": "^3.5.2"
  },
  "scripts": {
    "start": "nodemon src/index.ts",
    "build": "tsc -p ./"
  }
}
```

### `.eslintrc.json`

The `.eslintrc.json` file sets up the configuration for our ESLint setup. We're using the `@typescript-eslint/parser` package to help parse TypeScript code. We're extending the `@typescript-eslint/recommended` package which contains a series of recommended rules. We've also added and customized a few rules of our own.

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "extends": ["plugin:@typescript-eslint/recommended"],
  "env": { "node": true },
  "rules": {
    "indent": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```

### `tsconfig.json`

The `tsconfig.json` file is responsible for setting up the configuration of our TypeScript project. We've stated the `src/` folder to be the root directory of our TypeScript code. The output directory of compiled JavaScript code will be a `build/` folder that is to be created in the root of the server project directory. We've introduced a `strict: true` field in our configuration to enable a series of strict type-checking options.

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./build",
    "esModuleInterop": true,
    "strict": true
  }
}
```

### `src/listings.ts`

The `src/listings.ts` file is where we export and create a mock data array of listings. We've stated the array should conform to the `Listing[]` type where each item in the array is to have the `Listing` interface type.

```typescript
interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export const listings: Listing[] = [
  {
    id: "001",
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
    id: "002",
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
    id: "003",
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
```

### `src/index.ts`

The `src/index.ts` file is the main starting point of our app and is where we create and start our Node server. We import the `express` and `body-parser` packages as well as the mock `listings` array.

In the `src/index.ts` file, we run the `express()` function to create a server app instance. We apply middleware and pass in `bodyParser.json()` to have our request data be handled as JSON.

We declare two routes in our app, `/listings` and `/delete-listing`.

- The `/listings` route acts as a GET request for clients where clients can retrieve the listings data array.
- The `/delete-listing` route acts as a POST resource where clients can post information (i.e. the `id` of a listing) to delete a listing.

```typescript
import express from "express";
import bodyParser from "body-parser";
import { listings } from "./listings";

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get("/listings", (_req, res) => {
  res.send(listings);
});

app.post("/delete-listing", (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1)[0]);
    }
  }

  return res.send("failed to deleted listing");
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
```

### Moving forward

In the next coming lessons, we're going to introduce [GraphQL](https://graphql.org/). We're going to change what we've built in Module 1 to maintain a similar level of functionality
(i.e. query listings and delete a listing) but instead use a GraphQL API!

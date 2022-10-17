# Module 6 Summary

We've created our first functional component, the `<Listings>` component, and we've investigated how TypeScript allows us to type-check the props a component is expected to receive.

```tsx
interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  // ...
};
```

### `server.fetch()`

With the help of the browser window [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) method, we were able to create a `server.fetch()` function that's able to make a POST request to conduct our GraphQL queries and mutations.

We've stated the content of our POST request as `application/json`. The JSON body passed in our requests requires the `query` of the GraphQL request while `variables` is optional.

```typescript
interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return res.json() as Promise<{ data: TData }>;
  }
};
```

### `<Listings>`

In our `<Listings>` component, we've introduced two buttons. One button is responsible for querying the listings from our collection and the other in deleting a certain listing from our collection.

We've set up our GraphQL query documents as simple strings that are passed to each server fetch request we make in our component functions. For the delete listing request, we've hardcoded an `id` to delete a listing of that particular id.

```tsx
import React from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData
} from "./types";

const LISTINGS = `
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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: LISTINGS
    });
    console.log(data); // check the console to see the listings data from our GraphQL Request!
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "5d4507a9cf295034813b35c2" // hardcoded id variable,
      }
    });
    console.log(data); // check the console to see the result of the mutation!
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
      <button onClick={deleteListing}>Delete a listing!</button>
    </div>
  );
};
```

In each of our `server.fetch()` requests within the `<Listings>` component, we've established generics to help define the type of data that is to be returned from our request as well as type check the variables that are to be passed into a request.

### Moving forward

Though we've been able to create a custom `server.fetch()` function to help us query listings or delete a certain listing, we've only been able to see the results of our requests in our browser console. In the next module, we'll investigate how we can keep track of _state_ in our `<Listings>` component as well as modify how we make our query and mutation. We'll be interested in making our `listings` query the moment the component mounts and for the `deleteListing` mutation, we'll pass in an `id` from a listing that is to be selected from the UI.

We'll be achieving all this by introducing and using React Hooks!

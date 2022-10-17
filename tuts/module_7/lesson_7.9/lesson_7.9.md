# Module 7 Summary

In this module, we've introduced a few different Hooks to allow us to manipulate and handle information in our `<Listings>` component. By the end of the module, we created and used the custom Hooks, `useQuery` and `useMutation`.

### `useQuery`

The `useQuery` Hook is responsible for consolidating the information in having a GraphQL query be run the moment the component mounts. It returns a series of information such as the data that is to be returned from a query as well as the `loading` and `error` status of the query request. It also returns a `refetch` property which allows components to _refetch_ a query whenever the component may want to.

To keep track of the state of information within our query, we used React's [`useReducer` Hook](https://reactjs.org/docs/hooks-reference.html#usereducer). Initially, we used the [`useState` Hook](https://reactjs.org/docs/hooks-reference.html#usestate) which allows us to add React state to functional components. We moved to use the `useReducer` Hook to get a clearer separation between updates to the state object and actions needed to update the state object.

The [`useEffect` Hook](https://reactjs.org/docs/hooks-reference.html#useeffect) is used to invoke the query request the moment the component mounts. To be able to extract the function needed to make the request outside of the `useEffect` Hook, we used the [`useCallback` Hook](https://reactjs.org/docs/hooks-reference.html#usecallback) to memoize the `fetch()` function to never run until the `query` parameter value is changed. `query` is unlikely to ever change since it's to be a constant value declared outside of components.

```typescript
import { useReducer, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false, error: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({ type: "FETCH" });

        const { data, errors } = await server.fetch<TData>({
          query
        });

        if (errors && errors.length) {
          throw new Error();
        }

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
```

### `useMutation`

The `useMutation` Hook is similar to the `useQuery` Hook except for where a `useEffect` Hook isn't used to make the GraphQL request when the component first mounts.

```typescript
import { useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (state: State<TData>, action: Action<TData>) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};

export const useMutation = <TData, TVariables = {}>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: "FETCH" });

      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR" });
      throw console.error(err);
    }
  };

  return [fetch, state];
};
```

### `<Listings>`

The `<Listings>` component uses the `useQuery` and `useMutation` Hooks to make the GraphQL requests and destruct the values that are needed. The query and mutation result values are used to determine what should be displayed in the UI of the `<Listings>` component.

```typescript
import React from "react";
import { useQuery, useMutation } from "../../lib/api";
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later :(</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting :(. Please try again soon.
    </h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
```

### Moving forward

Though we're able to proceed with what we've done to build a larger application, there are limitations to what we've done.

For example, assume we had numerous components and when a component (like `<Listings>`) is first rendered, we make a GraphQL query. When we navigate elsewhere and remount the same component again, it'll be nice to have the data we've already queried _cached_ in our UI instead of having to make a repeat query to get the same data we already have.

Our `useQuery` Hook aims to make a query the moment the component mounts. But what if we wanted to make a query by only invoking an action (e.g. clicking a button, entering a form, etc.). Should we use the `useMutation` Hook for this?

What if we wanted more complicated functionality with how we handle our GraphQL requests. For example, what if we were able to refetch _another_ query based on the fact that a certain query or mutation has been made. As an example, when we delete a listing, assume we want to refetch a `User` query that provides information needed on the same page. We could try and tailor what we have to make this happen but this is where things start to get _a lot more complicated_.

This is where the Apollo Client and the React Apollo library fits in.

The [Apollo GraphQL documentation](https://www.apollographql.com/docs/react/) tells us that **Apollo Client** is a complete state management library. It allows us to fetch data and structure our code in a predictable and declarative format that's consistent with modern React practices. Some of the features it provides are declarative data fetching, an excellent developer experience and is designed for Modern React.

In the next module, we're going to install the React Apollo library of Apollo Client and we're going to use the Hooks given to us from React Apollo in our `<Listings>` component.

# Creating our Apollo Client

> [React Apollo v3](https://www.apollographql.com/docs/react/hooks-migration/#new-packages) introduces a new modular structure where individual packages can be installed to use React Apollo which helps reduce bundle size when compared with installing the entire `react-apollo` package.
>
> In the current and upcoming videos, we install and use the entire `react-apollo` umbrella library.
> In the documentation for this lesson, upcoming lessons, and for part 2 of the course - we'll install and use the Hooks variation of `react-apollo` - `@apollo/react-hooks`.

We aim to create our Apollo client, install React Apollo, and use React Apollo's Hooks to mutate and query data.

To create and use an Apollo client in React, Apollo expects us to install a few separate libraries. There are two separate approaches with setting up our Apollo Client - the [simple](https://www.apollographql.com/docs/react/advanced/boost-migration/#before) approach and the more [advanced](https://www.apollographql.com/docs/react/advanced/boost-migration/#after) approach.

The more advanced approach requires us to install certain specific libraries, such as the `apollo-client` library that provides access to the `ApolloClient` function constructor responsible in initializing the Apollo Client, a library to help with implementing caching, another library to help construct how we want to perform data fetching, and so on. Though we're able to do this, [Apollo encourages us to go through the more simple approach](https://www.apollographql.com/docs/react/essentials/get-started/) unless we need more unique customization.

The simple approach to setting up an Apollo client is using the [Apollo Boost](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost) package which comes with pre-built configuration for caching, state management, and error handling. To get started, we'll install three libraries:

- [`apollo-boost`](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost): The configuration package that contains everything we need to set up an Apollo Client.
- [`@apollo/react-hooks`](https://github.com/apollographql/react-apollo/tree/master/packages/hooks): The Hooks specific library of React Apollo to be used in React to help interact with our GraphQL API.
- [`graphql`](https://github.com/graphql/graphql-js): The GraphQL JavaScript library which will be needed to help parse our GraphQL queries.

```shell
npm install apollo-boost @apollo/react-hooks graphql
```

> [React Apollo v3](https://www.apollographql.com/docs/react/hooks-migration/#new-packages) introduces a new modular structure where individual packages can be installed to use React Apollo. Since in our case, we're only interested in using the new Hooks variation of React Apollo, we recommend installing `@apollo/react-hooks`. You can read more about the different modular packages that React Apollo provides in [React Apollo's documentation](https://www.apollographql.com/docs/react/hooks-migration/#new-packages).

`apollo-boost` and React Apollo are TypeScript libraries themselves so we won't have to install additional type declaration files for them. For `graphql` however, we'll need to install the accompanying types definitions.

```shell
npm install @types/graphql --save
```

### `ApolloClient`

We'll create our Apollo client in the root `src/index.tsx` file which will allow us to connect our client with the entire React application. In our `src/index.tsx` file, we'll import the `ApolloClient` constructor from the `apollo-boost` library.

```tsx
import ApolloClient from "apollo-boost";
```

We'll create a new Apollo client with the `ApolloClient` constructor and assign it to a `client` const variable.

```tsx
import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { Listings } from "./sections";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient();

render(
  <Listings title="The Listings Section Component!" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

The `ApolloClient` constructor takes a configuration object where we can specify or apply some changes to the already pre-built configuration Apollo Boost provides. Currently, the only thing we need to specify is a `uri` field which is the reference to the GraphQL API endpoint we want to interact with. We'll specify the `uri` field and give a value of the target location of our api - `http://localhost:9000/api`.

If we recall, we've already set up a proxy in our React application to proxy URLs like `http://localhost:9000/api` to `/api`, so we'll simply provide a value of `/api` in the `uri` field of our `ApolloClient` constructor.

```tsx
import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { Listings } from "./sections";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "/api"
});

render(
  <Listings title="The Listings Section Component!" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

That's all it takes to create an Apollo client with Apollo Boost.

### `ApolloProvider`

We'll now need to connect our Apollo client with our React application. This is where we'll need to import the `ApolloProvider` component from `@apollo/react-hooks`.

```tsx
import { ApolloProvider } from "@apollo/react-hooks";
```

`ApolloProvider` can wrap our React app and make our Apollo client available as context everywhere in our app. In our instance, we'll wrap the only component we have, `<Listings>`, with `<ApolloProvider>`.

We'll pass our Apollo client to the `client` prop the `<ApolloProvider>` component expects.

```tsx
import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Listings } from "./sections";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "/api"
});

render(
  <ApolloProvider client={client}>
    <Listings title="TinyHouse Listings" />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Our application is now prepared to start using React Apollo to make our GraphQL Requests!

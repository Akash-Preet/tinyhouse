# Module 8 Introduction

We've spent a decent amount of time working with some of React's core Hooks. We've seen how the `useState`, `useEffect`, and `useReducer` Hooks work. We've even created our custom Hooks as well - `useQuery` and `useMutation`. Though our custom Hooks work well, there's probably a more robust way to conduct GraphQL requests.

Going forward, we'll be using [Apollo Client](https://www.apollographql.com/docs/react/) to manage our GraphQL API requests. Apollo Client has intelligent caching and is being used in production applications today. [React Apollo](https://github.com/apollographql/react-apollo) is the React implementation of Apollo Client.

In this module, we'll:

- Create our own Apollo Client with the help of the [`apollo-boost`](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost) package.
- Use the [`useQuery`](https://www.apollographql.com/docs/react/api/react-hooks/#usequery) and [`useMutation`](https://www.apollographql.com/docs/react/api/react-hooks/#usemutation) Hooks from `react-apollo`.
- Autogenerate type definitions from our GraphQL Schema with the help of the [Apollo CLI](https://github.com/apollographql/apollo-tooling#apollo-cli).

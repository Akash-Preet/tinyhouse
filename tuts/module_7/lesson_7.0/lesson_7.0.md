# Module 7 Introduction

In the last module, we made our client have the ability to make requests to our API. However, we haven't been able to display any information in our UI just yet. In this module, we're going to use [React Hooks](https://reactjs.org/docs/hooks-intro.html) to display data in our UI as well as handle our GraphQL API requests.

React Hooks are functions that allow components to hook into React specific features. In this module, we'll:

- Introduce and explain what React Hooks are.
- Use React's [`useState` Hook](https://reactjs.org/docs/hooks-state.html) to keep track of component state.
- Use React's [`useEffect` Hook](https://reactjs.org/docs/hooks-effect.html) to help make our GraphQL query when our component first mounts.
- Create our own custom `useQuery` Hook that consolidates the functionality to make a query when a component mounts.
- Extrapolate a `refetch()` property from our `useQuery` Hook to help our components re-trigger a query after the component has already been mounted.
- Retrieve the `loading` and `error` status of our query made with the `useQuery` Hook.
- Create a `useMutation` hook that provides a request function to conduct mutations.
- Finally, use React's `useReducer` Hook to recognize a different way to handle state and state changes in our custom Hooks.

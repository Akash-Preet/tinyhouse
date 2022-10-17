# React Hooks

> 🎥 React Today and Tomorrow | React Conf 2018 - [link](https://www.youtube.com/watch?v=dpw9EHDh2bM).<br/>
> 📖 React Hooks API Reference | React Docs - [link](https://reactjs.org/docs/hooks-reference.html).<br />
> 📖 React Rules of Hooks | React Docs - [link](https://reactjs.org/docs/hooks-rules.html).

In our React Introduction lesson, we mentioned how components in React can be created with either a class or a function. Traditionally, React required us to create components with classes to:

- Use `state` within a component.
- Be able to use other certain React features (e.g lifecycle methods).

As a result, class components were often used as "container" components since these components were stateful and responsible in defining and providing data to other components. Function components didn't keep their own state and were more used as "presentational" components to determine the presentation of UI.

From this, a popular pattern emerged for having components be divided into two categories - "container" and "presentational". There were variations to this approach but as of late, Dan Abramov (React core team member) [does not suggest splitting components with the container and presentational pattern anymore](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). This is in large part due to the presence of a new React feature - [React Hooks](https://reactjs.org/docs/hooks-intro.html).

When it comes to sharing stateful logic between any components, other more advanced patterns emerged such as:

- [Higher Order Components](https://reactjs.org/docs/higher-order-components.html) - Functions that take a component and return a _new_ component with additional data or functionality
- [Render Props](https://reactjs.org/docs/render-props.html) - Props whose value is a function where the component calls the prop function to return the React element instead of implementing its own logic.

Higher-order components and render props are advanced patterns that simply emerged within the React community to handle component logic re-use. Though both these patterns help abstract shared logic, they tend to make components difficult to understand.

[Dan Abramov summarized the above issues as symptoms of a certain particular problem](https://youtu.be/dpw9EHDh2bM?t=762). Roughly quoted, this is because React _didn't_ provide a simpler/smaller primitive to adding state or lifecycle than a class component. Class components are difficult to split up unless more complicated patterns are used which then can lead to something often labeled as ["wrapper hell"](https://reactjs.org/docs/hooks-intro.html#its-hard-to-reuse-stateful-logic-between-components) where component declarations are wrapped over one another multiple levels deep.

## Motivation behind React Hooks

This is where Hooks come in. **Hooks aims to solve the difficulties of logic reuse by enabling us to write functional components that have access to features like `state`, `context`, lifecycle methods, `ref`, etc. without having to write a Class component**.

In this lesson, we'll go through one example of a React Hook - the [`useState` Hook](https://reactjs.org/docs/hooks-state.html).

In traditional class-based React components with the stable JavaScript syntax, creating a class component that keeps track of state will look something like the following:

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
  super(props);
    state = {
      count: 0
    }
  }

  increment() {
    setState({
      count: this.state.count + 1
    })
  }

  decrement() {
    setState({
      count: this.state.count - 1
    })
  }

  return (
  <div>
    <p>{this.state.count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
  );
};
```

We have a `count` state property created and we have component methods that call the component `setState` function to update the `count` property. This component renders two buttons where each button when clicked either increments or decrements the `count` state property being rendered in the UI.

The equivalent of this with the `useState` Hook in a function component will look something like the following.

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

We declare the `useState` Hook at the top of the function component. We declare the initial value of the state property as `0` and we destruct a `count` property and `setCount` function. `count` is rendered as part of the component template and the component functions use the `setCount` function property to update the `count` state value.

Notice how much more legible the `useState` Hook is when it comes to creating and updating a component state value? This is compounded even further when we introduce other Hooks for other specific features we'd want in a component.

## Custom Hooks

Hooks essentially allow us to split a component into smaller functions that can easily be reused between components. The ability to create custom Hooks makes sharing logic between components incredibly intuitive.

Assume we wanted another component to implement a very similar counter to what was done in the `Counter` component example we had earlier. We could replicate the important bits of code (the initialization of the state property and the functions to increment or decrement state value) _or_ create a custom Hook that consolidates the logic responsible for the counter.

Here's an example of creating a custom `useCounter` Hook to consolidate the logic around incrementing/decrementing a state value.

```jsx
import React, { useState } from "react";

const useCounter = ({ initialState }) => {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return [count, { increment, decrement }];
};
```

We have a custom `useCounter` Hook that accepts an `initialState` value and uses it in a `useState` Hook. The `useCounter` Hook then sets up `increment` and `decrement` functions responsible in updating the state `count` property created. The `useCounter` Hook simply returns the information a component may need such as the `count` state property and the `increment`/`decrement` functions.

All a component needs to do is declare the `useCounter` Hook at the very beginning, pass in the initial value of the `count` property and destruct and use the properties given to it by the `useCounter` Hook.

```jsx
import React, { useState } from "react";

const useCounter = ({ initialState }) => {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return [count, { increment, decrement }];
};

const Counter = () => {
  const [myCount, { increment, decrement }] = useCounter({
    initialState: 0
  });

  return (
    <div>
      <p>{myCount}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

The properties destructured from the `useCounter` Hook are part of the `Counter` component. The `useCounter` Hook simply _abstracts the logic away_ so the `Counter` or any other component doesn't explicitly have to define the same stateful logic pattern.

That was easy! Though `useCounter` is a simple example, it does show how effective Hooks are when it comes to reusing logic between components.

## Hooks - Good to knows

We'll be taking a better deep dive as we introduce Hooks in the next coming lessons but here are a few notes to know about when using Hooks.

- Custom Hooks are _functions_ that call other Hooks. As a best practice, custom Hooks should always be denoted with the term `use` before the Hook name. (e.g. `useCounter`).
- We should only call Hooks at the top level of components.
- We should only call Hooks from React functions (not native JavaScript functions).
- There are no breaking changes with the emergence of Hooks. Hooks are entirely opt-in and the React team has no plans of removing the class-based syntax. [We're simply encouraged by the React team to start to introduce Hooks in new components that we intend to create](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy).

In the next lesson, we'll take a deeper dive into the `useState` Hook and see how we can use it in our application to keep track of component state.

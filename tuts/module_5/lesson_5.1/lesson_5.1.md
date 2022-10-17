# React

Though this course assumes some experience with the use of [React](http://reactjs.org), we're going to cover some of the core concepts of React in this lesson to bring everyone up to speed.

## Traditional JavaScript

In traditional HTML and JavaScript applications, JavaScript is used to _directly_ manipulate the [DOM (i.e. the Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). To make changes in our UI, we'd have to make references to the DOM and imperatively declare the changes we'd want.

For example, assume we had a simple `<h2>` element that said `Hello World!` and a button with an `onclick` listener that calls a `changeGreeting()` method when triggered.

```html
<html>
  <body>
    <div id="app">
      <h2>Hello World!</h2>
      <button onclick="changeGreeting()">
        Change Greeting
      </button>
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

Let's say we're interested in toggling the text content of the `<h2>` element when the button is clicked. To do so in native JavaScript, we have to get the reference to the DOM node in question and only then will we be able to change the text content of the DOM node.

Here's an example of toggling between the `Hello World!` and `What is up!` text when the `Change Greeting` button element is clicked.

```js
let greetingTag = document.getElementsByTagName("h2")[0];

changeGreeting = () => {
  if (greetingTag.textContent === "Hello World!") {
    greetingTag.textContent = "What is up!";
  } else {
    greetingTag.textContent = "Hello World!";
  }
};
```

This works fine but the problem a lot of engineers noticed with large-scale applications is things get difficult to track _very quickly_. Certain libraries came to the scene to help structure things better with the Model-View-Controller pattern or even the Model-View-Presenter pattern. React came into the scene with a pretty unique way of solving this.

## React

React changed the paradigm of how we make changes to our UI with the help of something known as the [**virtual DOM**](https://reactjs.org/docs/faq-internals.html). The virtual DOM is a cool term for essentially just JavaScript objects that represent the structure of the DOM.

When we make changes in React, we don't make changes directly to the actual DOM - we make changes to the virtual DOM. Why? Because it's a _lot_ less expensive too. React then has the responsibility to compare the difference between the changes to the virtual DOM and the actual DOM, then patch the changes made to the actual DOM.

This has introduced a different way of building UI with React.

### JSX

React gives us the ability to use [JSX](https://reactjs.org/docs/glossary.html#jsx), a non-standard syntax which helps us create markup in JavaScript.

Here's an example of using the `ReactDOM.render()` function to render an element on a particular DOM node.

```jsx
ReactDOM.render(<h2>Hello World!</h2>, document.getElementById("app"));
```

`ReactDOM.render()` is often the starting point of React Applications. The `<h2>Hello World!</h2>` element passed in the first argument of the `ReactDOM.render()` is JSX - **XML-like syntax in JavaScript**.

### Reusable Components

[Components](https://reactjs.org/docs/glossary.html#components) are the building blocks of React applications and are essentially functions or classes that return a React element. Reusability and maintainability are some of the significant benefits of having well-structured components in a large application.

Here's a `HelloWorld` function component that simply renders a header element of `Hello World!`.

```jsx
import React from "react";

const HelloWorld = () => {
  return <h2>Hello World!</h2>;
};
```

### Data-Driven Applications

The heart of every React component is its **state**. State is an object that determines how the component behaves. When we make changes in React, we never make changes to the DOM directly but **make changes to state**. React is responsible in rendering and re-rendering components based on changes made to state.

Here's a similar implementation to what we had before with the native JavaScript example of having a click listener be used to update the text content of a `<h2>` element.

```jsx
import React, { useState } from "react";

const HelloWorld = () => {
  const [message, setMessage] = useState("Hello World!");

  changeMessage = () => {
    let newMessage = message === "Hello World!" ? "What is up!" : "Hello World!";
    setMessage(newMessage);
  };

  return (
    <div>
      <h2>{message}</h2>
      <button onClick={changeMessage}>Change Greeting</button>
    </div>
  );
};
```

In this case, we're using React and the capability of state to update our UI. We use the [`useState` Hook](https://reactjs.org/docs/hooks-overview.html#state-hook) to return a `message` state property and `setMessage()` function. The `message` property is returned as part of the component template, and the `setMessage()` function is used to update the message state button whenever the component `changeMessage()` function is invoked.

Notice the data-driven mindset of how we change UI in React? In React, we update data (i.e. `state`) and React takes responsibility in determining the changes to be made in the UI based on the change to state.

> We'll be taking a deep dive into what React Hooks are and how the `useState` Hook behaves in Module 7.

### Props and unidirectional data flow

To pass data from one component to another, React gives us the capability to use something known as **props** to achieve this.

Props can only flow in a single direction, from parent components down to child components (and further down). When a change in state is made in a parent, React will cause the components that depend on these values to re-render.

Here's an example of having a parent pass a `message` prop with a string value of `Hello World!` to a child component.

**Parent**

```jsx
ReactDOM.render(<HelloWorld message="Hello World!" />, document.getElementById("app"));
```

**Child**

```jsx
import React, { useState } from "react";

const HelloWorld = ({ message }) => {
  return <h2>{message}</h2>;
};
```

### Class and Function Components

React gives us the capability to create components one of two ways, with **classes** or **functions**. In either case, a react element is expected to be returned.

Here's a class component that has a `message` state property and returns it as part of the returned component element. A `componentDidMount` lifecycle method is used to log something to the console whenever the component first mounts.

```jsx
import React, { Component } from "react";

class HelloWorld extends Component {
  constructor(props) {
    super(props);
    state = {
      message: "Hello World!"
    };
  }

  componentDidMount() {
    console.log("Component has mounted!");
  }

  render() {
    return <h2>{message}</h2>;
  }
}
```

Here's the functional component alternative where in this case, we can use the [`useState` Hook](https://reactjs.org/docs/hooks-state.html) to create our state value. We can use the [`useEffect` Hook](https://reactjs.org/docs/hooks-effect.html) to have an effect that logs a message to the console when the component first mounts.

```jsx
import React, { useState, useEffect } from "react";

const HelloWorld = () => {
  const [message] = useState("Hello World!");

  useEffect(() => {
    console.log("Component has mounted!");
  }, []);

  return <h2>{message}</h2>;
};
```

Traditionally, class components had to be used to declare state as well as any lifecycle effects a component can have. This is why a [container/presentational structure](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) often arose where container class components will contain the state and lifecycle of a component and simply pass the data down as props to simple "dummy" presentational components.

Well, as of recently the container/presentational pattern isn't required any longer thanks to a major feature React introduced known as [React Hooks](https://reactjs.org/docs/hooks-intro.html)! We'll be taking a deep dive into Hooks in a few modules from now!

This lesson isn't intended to be a thorough introduction to React but instead aims to serve as a refresher for some of the main core concepts such as JSX, `props`, `state`, etc. We'll be familiarizing ourselves with these concepts some more once we start to use them in the components we begin to build.

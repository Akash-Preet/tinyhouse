# UI Frameworks and Ant Design

You may have noticed that though our app functionally works well, it doesn't look great. This is due to us not introducing any styling (CSS) whatsoever. Though we could style our app purely through custom means, we'll employ and use a UI framework to help us achieve this.

## UI/CSS Framework

Writing, creating, and producing robust CSS code for large applications _take a lot of work_. Presentation, appearance, responsiveness, accessibility, and structure are a lot of things that need to be kept in mind when building front-end code.

This is where UI/CSS frameworks often come in. UI/CSS Frameworks are packages containing pre-written, standardized, and often well-tested template and CSS code. They help speed up development, often-times provide a grid layout, and help enforce good web design. With that said, there are some disadvantages to using them. UI/CSS frameworks restrict the ability for us to customize and edit prepared styles and set-up, increase bundle size of an application by introducing a lot more code, and often requires a little time for one to get used to.

Examples of popular CSS/UI frameworks are:

- <https://getbootstrap.com/>
- <https://bulma.io/documentation/>
- <https://semantic-ui.com/>

Though the above libraries do a great job, their native structure is simple HTML and CSS. If we wanted to use some of this prepared code, we would essentially look to create our own React components that can be reused elsewhere.

With that said, React UI frameworks now exist that achieves this for us. For example, we could use libraries like:

- <https://react-bootstrap.github.io/>
- <https://www.npmjs.com/package/react-bulma-components>
- <https://react.semantic-ui.com/>

The benefits of these libraries are that a large number of components have already been prepared for us. When the library is available in our app, we can simply import these components and use them directly.

## Ant Design

In this course, we'll be using a React UI framework known as [Ant Design](https://ant.design/). Ant Design is a robust UI framework with practically every component we can think of needing/or using in an application. We love Ant Design's styling and aesthetics and every component we've come across looks and appears beautiful. From simple components like [menus](https://ant.design/components/menu/), [badges](https://ant.design/components/badge/), [alerts](https://ant.design/components/alert/), [buttons](https://ant.design/components/button/) to more complicated components like [date pickers](https://ant.design/components/date-picker/), [tables](https://ant.design/components/table/), [image uploaders](https://ant.design/components/upload/) and so on, it's an incredibly well polished library!

There are some issues with working with Ant Design.

- The library is opinionated and though customizations can be done, it's a little tedious at times.
- Ant Design's bundle size, when introduced and used in an application, is fairly large.
- There are a few components that aren't the best suited for accessibility.

> Bundle size and accessibility are both areas to be improved for Ant Design's next official update - [v4](https://github.com/ant-design/ant-design/issues/16911).
>
> If you're interested in picking a UI framework for a large production app, we encourage you to take some time to look through some of the pros and cons of many different options before making a choice.

For proof of concepts and what we intend to do, Ant Design works perfectly. With that said, a lot of the things we demonstrate when it comes to importing and using components from Ant Design _can be relayed to any React UI framework you might like to use_.

In the next lesson, we'll install Ant Design and use some of their components to make our app appear more presentable.

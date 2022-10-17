# GraphQL Concepts

Now that we've seen the advantages of using GraphQL in a real-world example, let's dive into some core concepts. After interacting with [Github's GraphQL API](https://developer.github.com/v4/) in the previous lesson, we know that the GraphQL query language allows us to select properties on certain object types.

For example, assume we could query the `title` and `price` fields on a `listing` object type that we can create.

```graphql
{
  listing {
    title
    price
  }
}
```

This will return data that looks something like the following:

```json
{
  "data": {
    "listing": {
      "title": "Chic condo...",
      "price": 50
    }
  }
}
```

How do we know that the `listing` object has a `title` or a `price` property? Does the `listing` object have more properties we can select? This is where the [**GraphQL Schema**](https://graphql.org/learn/schema/) comes in.

Every GraphQL API has a schema which **completely describes** all the possible data we can request. The schema is the blueprint of a GraphQL API. When a request comes in, it is validated against this schema and processed accordingly.

How do fields in the schema get processed? That's due to the second piece of a GraphQL API - the [**resolvers**](https://www.apollographql.com/docs/graphql-tools/resolvers/#resolver-map). GraphQL resolvers are functions that turn a GraphQL operation or request into data.

We'll first talk about the GraphQL schema before we dive into discussing GraphQL resolvers.

## Object types

As quoted from the [GraphQL documentation](https://graphql.org/learn/schema/#object-types-and-fields), the most basic component of a GraphQL schema are the [object types](https://graphql.org/learn/schema/#object-types-and-fields) which represent the kind of object we can query and what properties that object has. For the example above, we could have had an object type like the following:

```graphql
type Listing {
  id: ID!
  title: String!
  address: String!
  price: Int!
}
```

The above states that:

- We're creating an object type called `Listing`.
- The `Listing` object has a property called `id` which is a GraphQL `ID`.
- The `Listing` object has a property called `title` which is a GraphQL `String`.
- The `Listing` object has a property called `address` which is a GraphQL `String`.
- The `Listing` object has a property called `price` which is a GraphQL `Int`.

The definitions at the end of these fields refer to the type that is to be returned from the field. (e.g. `title` is expected to return a `string`).

> The syntax we're looking at here is known as the [Graphql Schema Language](https://graphql.org/learn/schema/#type-language) with which we're going to talk about some more as we start to introduce GraphQL into our Node application.

A GraphQL schema allows us to develop relationships between different object types. For example, we can say the `Listing` object type can have a `tenant` field in which `tenant` is to be an object type of its own (e.g the `User` object type).

```graphql
type Listing {
  "..."
  tenant: User!
}
```

The `User` object type can have a similar but inverse relationship of its own where it can contain a `listing` field of the `Listing` object type.

```graphql
type User {
  "..."
  listing: Listing!
}
```

These are **one-to-one relationships** where a listing can return a particular user and a user can return a certain listing. We could also have **one-to-many relationships** where we can say, for example, the `User` object type has a `listings` field that returns a list of listings.

```graphql
type User {
  "..."
  listings: [Listing!]!
}
```

> In the GraphQL Schema Language, we can define a GraphQL list by using the square brackets syntax. In this case, we're stating the `listings` field is to return a list of `Listing` objects - `[Listing!]!`.
>
> The `!` syntax is to tell our schema that the fields are marked as _non-null_ (i.e. the field is _required_ to be of a certain type and never `null`).
>
> We discuss more about lists and the non-null marker at the end of this lesson and in a lot more detail in the upcoming lessons.

That are two special object types within a GraphQL schema called `Query` and `Mutation`. Every GraphQL schema must have a `Query` type and may or may not have a `Mutation` type.

**`Query` and `Mutation` represent the entry points of every GraphQL query**. The purpose of the `Query` type is to define all the possible entry points for fetching data (i.e. queries). The purpose of the `Mutation` type is to define all the possible entry points for manipulating data (i.e. mutations).

Here's an example of having the `Query` type that will allow us to query a field known as `listings`. We can also have the `Mutation` type to have a field labeled `deleteListing` which takes an `id` as an argument.

```graphql
type Query {
  listings: [Listing!]!
}

type Mutation {
  deleteListing(id: ID!): Listing!
}
```

The `listings` query and `deleteListing` mutation are seen to both return variations of the `Listing` object type.

## Scalar types

The properties of a GraphQL object must resolve to concrete data at some point. This is where [**scalar types**](https://graphql.org/learn/schema/#scalar-types) come in. Scalar types represent basic data types that do not have any more nested properties.

```graphql
field: Boolean!
field: Int!
field: Float!
field: String!
field: ID!
```

GraphQL comes with a set of default scalar types out of the box:

- `Boolean`: `true` or `false`.
- `Int`: A signed 32‐bit integer.
- `Float`: A signed double-precision floating-point number (i.e. a decimal number).
- `String`: A UTF‐8 character sequence.
- `ID`: Used to represent a unique identifier (i.e. not intended to be human-readable) but gets serialized as `String`.

## Enumeration types

[Enumeration types](https://graphql.org/learn/schema/#enumeration-types) are a special kind of scalar type that is restricted to a defined set of allowed values. If we wanted to introduce a `listingType` property to our `Listing` object type example and state the `listingType` value is to be one of a certain number of values, we can use an Enumeration (`enum`) type to describe this:

```graphql
enum ListingType {
  HOUSE
  APARTMENT
}
```

> In TypeScript, a GraphQL `enum` often gets mapped to a TypeScript [string `enum`](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums) by default. We'll see examples of this as we move to Part II of the course.

### Lists

Though objects, scalars, and enums are the only types we can define in GraphQL, we can apply additional modifiers to affect their behavior. We can define fields to be [_lists_](https://graphql.org/learn/schema/#lists-and-non-null) by using the square bracket syntax in the GraphQL Schema Language.

Here's an example of introducing a `bookings` field that is to return a list of the `Booking` object type.

```graphql
type Listing {
  "..."
  bookings: [Booking]
}
```

Notice how the `[Booking]` syntax is different from `[Booking!]!`? The `!` is how we can mark fields to be _non-null_ (i.e. the field is to resolve to the type specified and never to be `null`).

```graphql
type Listing {
  "users is to always be a list of the User type"
  users: [User!]!
  "bookings may be null AND the items in the bookings list may be null"
  bookings: [Booking]
}
```

## Arguments & input types

Just like functions in any other programming language, we can pass arguments to GraphQL fields since fields are conceptually functions that return values.

What if we needed to pass in multiple values to a `createListing` GraphQL field to be able to resolve the intended result (i.e. have a listing be created)? Just like like we can pass in multiple arguments in a JavaScript function, we can pass in multiple arguments to a GraphQL field.

```graphql
type Mutation {
  createListing(id: ID!, title: String!, address: String!, price: Int!): Listing!
}
```

Good convention will often find us creating [input object types](https://graphql.org/learn/schema/#input-types) in situations like this. In the GraphQL schema language, input types look the same as regular object types but with the keyword `input` instead of `type`:

Here's an example of stating that a `createListing` mutation accepts a _non-null_ input argument of `CreateListingInput`.

```graphql
input CreateListingInput {
  id: ID!
  title: String!
  address: String!
  price: Int!
}

type Mutation {
  createListing(input: CreateListingInput!): Listing!
}
```

## Field resolvers

At this point, we've come to understand that a GraphQL schema lays out the blueprint of how a GraphQL API is to be shaped. But how do these fields return values or make the changes we expect them to?

We've mentioned this earlier but this is where GraphQL resolvers come in.

**[GraphQL resolvers](https://graphql.org/learn/execution/) are functions or methods that _resolve_ the value of GraphQL field**.

Every field in a GraphQL API is referenced with a resolver function responsible in returning the value of that field.

Here's an example of resolver functions for a root level `listings` query and `deleteListing` mutation fields. The `listings` field is to return a list of listings while the `deleteListing` field is to delete a listing and return the deleted listing.

```typescript
Query: {
  listings: (obj, args, ctx) => {
    return listings;
  },
},
Mutation: {
  deleteListing: (obj, args, ctx) => {
	  for (let i = 0; i < listings.length; i++) {
	    if (listings[i].id === id) {
	      return listings.splice(i, 1)[0];
	    }
	  }
  },
},
```

What are the `obj, args, ctx` parameters defined above?

A GraphQL `resolver` receives [**four positional arguments**](https://graphql.org/learn/execution/#root-fields-resolvers).

- **`obj`** - the object returned from the resolver on the parent field. For root `Query` and `Mutation` object types, this argument is often not used and undefined.
- **`args`** - the arguments provided to the field.
- **`context`** - a value provided to _every_ resolver and which usually holds important context information (e.g. state of currently logged in user).
- **`info`** - used usually only in advanced cases but contains information about the _execution_ state of the query - such as the `fieldName`, `schema`, `rootValue`, etc.

We'll stop here for now. This lesson touches on some core concepts of GraphQL to give us a head start as we proceed. There are numerous other topics (both advanced and non-advanced) like [Pagination](https://graphql.org/learn/pagination/), [Caching](https://graphql.org/learn/caching/), [Union Types](https://graphql.org/learn/schema/#union-types), [Interfaces](https://graphql.org/learn/schema/#interfaces), etc. that we haven't discussed. However, this will be enough to get us started and well on our way for the next couple of lessons. Keep in mind that we're going to **reintroduce each of the topics discussed in this lesson as we begin to use them in the course**!

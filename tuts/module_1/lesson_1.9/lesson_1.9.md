# Introducing mock listings

> 📝 The mock listings array used in this lesson can be found - [here](https://gist.github.com/djirdehh/ff1d85dc00498fa2427467013b1f3ecb).

Let's add a little functionality to our current minimal server. To get us started, we're going to introduce a mock array of data that we'll be able to use and manipulate before we talk about and address more appropriate data persistence.

We'll introduce this mock array in a `listings.ts` file within our `src/` folder.

```shell
server/
  // ...
  src/
    index.ts
    listings.ts
  // ...
```

The mock data we hope to introduce is a collection of rental listings where each listing will have a listing `title`, `image`, `address`, `price`, `rating`, number of `beds`, number of `baths`, and permissible number of `guests`. Our mock array is to have three distinct listing objects. This is purely fake data, with fake addresses, and copyright-free to use images.

We'll create and export a `const` labeled `listings` that is to be this mock array, in the `src/listings.ts` file.

```typescript
export const listings = [
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

When we hover over the `listings` constant variable, we can see that TypeScript infers the type since we've initialized it with data. The type inferred is an array of objects that contain these following properties with their respective types.

```typescript
// inferred listings type

const listings: {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}[];
```

The square bracket at the end of the type definition is one of the commonly used ways to define an [Array Type](https://www.typescriptlang.org/docs/handbook/basic-types.html#array).

What if we _changed_ the `title` field of one object from a `string` to a `number`. When we inspect to see what the type of `listings` becomes, we can see that our editor tells us that TypeScript infers that an object item in the array _could be of one of two objects_.

```javascript
// inferred listings type

const listings: ({
    // ...
    title: number;
    // ...
} | {
    // ...
    title: string;
    // ...
})[]
```

This pipe symbol `|` is used to create something known as a [Union Type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types) in TypeScript - which is essentially stating that the type could be _either_ one or the other.

Could we ensure that the objects we declare in the `listings` array have to conform to a single shape? We could, by creating an explicit type that helps describe the shape of `listings`.

### Interfaces

There are two common ways we can describe the shape of a single listing object. A [type alias](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) or an [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html).

```typescript
// Type Alias
type Listing = {};

// Interface
interface Listing {}
```

A type alias or an interface can be used with [minor differences between them](https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases). We'll resort to using an interface since the TypeScript team has historically used [interfaces to describe the shape of objects](https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases).

We'll have a `Listing` interface be created at the top of the `listings.ts` file which will describe the shape of a single listings object. We'll expect each listing object to have:

- An `id`, `title`, `image` and `address` of type `string`.
- `price`, `numOfGuests`, `numOfBeds`, `numOfBaths`, and `rating` of type `number`.

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
```

With our `Listing` interface defined, we'll assign the appropriate type to the `listings` array we've created.

```typescript
export const listings: Listing[] = [
  // ...
];
```

We've set the `listings` constant variable to be an Array Type of `Listing` which states that each element in the array should conform to the `Listing` interface. If we now attempt to specify a value for a field that doesn't conform to the `Listing` interface shape, TypeScript will warn us of this incorrectness.

> Though we won't ever do this, the one other way we can define an array type is to use the [array generic type](https://www.typescriptlang.org/docs/handbook/basic-types.html).
>
> `Array<Listing>`
>
> Our ESLint set-up doesn't accept the use of the array generic type so we'll stick with the initial approach of defining an array type throughout the course. We'll be taking a deeper dive into what TypeScript generics are in some of the upcoming lessons.

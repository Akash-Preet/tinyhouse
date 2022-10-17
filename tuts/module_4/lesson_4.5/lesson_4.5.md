# Setting Up Env Variables

In the last lesson, we hard-coded MongoDB environment configuration values directly into our code. We created a `user` variable, a `userPassword` variable, and a `cluster` variable in our `src/database/index.ts` file. We obtained the values of these variables directly from our MongoDB Atlas dashboard.

Having these database configuration values in our code is a bad idea for a couple of reasons.

- Database environment variables should be confidential so we should be wary of having our values publicly available especially if we start to consider pushing our source code to an online repository.
- As the name suggests, environment variables are for setting up our app's _runtime environment_. They don't have anything to do with our app's logic. What if we wanted to change our MongoDB's user password when our application has already been built? We would want to update the environment variable without having to go back into the source code and changing it. This will help limit the need to modify and redeploy an app due to changes in configuration data when an app is already deployed.

### `process` and `dotenv`

In Node, [`process`](https://nodejs.org/api/process.html#process_process) is a global object with information about the currently running process. [`process.env`](https://nodejs.org/api/process.html#process_process_env) is an object within `process` that contains information representative of the state of the Node environment. During runtime, the reference to an environment variable within `process.env` is replaced with the actual value of the variable.

Environment variables defined within `process` can be specified both in a development setting as well as in a production setting. The [`dotenv` library](https://github.com/motdotla/dotenv) is a popular package that helps load variables from a `.env` file for Node.js projects, which is helpful during development.

We'll head to the terminal and install the `dotenv` library as a development dependency. We'll also install the type declaration file of `dotenv` as a development dependency.

```shell
server $: npm install -D dotenv @types/dotenv
```

> We're installing `dotenv` library as a `devDependency` since when we deploy our app, our cloud management solution - [Heroku](https://www.heroku.com/) will automatically save environment variables defined in the dashboard into `process.env`. As a result, we won't need the `dotenv` library in our production code. However, if you choose to use another method to deploy your app that may require a `.env` file, you might need to install `dotenv` as a regular dependency!

With `dotenv` installed, we'll create a `.env` file in the root of our project directory.

```shell
server/
  // ...
  .env
```

In this `.env` file, we can specify the different values that we'd want to be passed in as environment variables. Convention often finds us defining these variables with capital letters.

We'll define three environment configuration variables, `DB_USER`, `DB_USER_PASSWORD`, and `DB_CLUSTER`. We'll retrieve the values of the DB configuration variables from our MongoDB Atlas dashboard.

```shell
DB_USER=user_001
DB_USER_PASSWORD=XXXXX
DB_CLUSTER=cluster0-mbfgp
```

In certain environments (Heroku for example), we can specify the port in which the app is to run as an environment variable. With that in mind, we'll also specify a `PORT` environment variable as well which would be the port our app is to run on.

```shell
PORT=9000
DB_USER=user001
DB_USER_PASSWORD=XXXXX
DB_CLUSTER=cluster-kli81
```

### `src/index.ts`

Next, we'll modify our code to use the values from our `.env` file. First, we'll require and configure `dotenv` as early as possible in our application in the `src/index.ts` file. To do so and before any imports, we'll use the `require` syntax to introduce the library and run the `config()` function. This helps us avoid any ESLint warnings of running code before the import of other files and by doing so as early as possible, this also helps prevent compilation issues where other imported files don't pick up environment variables.

```typescript
require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  // ...
};

mount(express());
```

`process.env` will now have the keys and values defined from our `.env` file during development. In the `src/index.ts` file, we can use the `process.env.PORT` value to reference the port defined in our environment variables in the `app.listen()` function and the `console.log()` method.

```typescript
require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  // ...

  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
```

### `src/database/index.ts`

In the `src/database/index.ts` file, we'll reference the values necessary for our MongoDB connection from `process.env`. We'll also remove the hard-coded variables we've specified before.

```typescript
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  // ...
};
```

### `.gitignore`

Like we've mentioned before, environment variables should never be committed to source code. An easy way to prevent `git` from committing the entire `.env` file is by introducing a [`.gitignore` file](https://help.github.com/en/articles/ignoring-files#create-a-local-gitignore) that references the files we don't want to be committed (e.g. `.env`).

We'll create a `.gitignore` file at the root of our project. In addition to not ever committing `.env` files there's a few other files and folders that usually shouldn't be committed such as the `node_modules` folder, the `build/` folder from our TypeScript compilation process, and any `npm` or `yarn` debug logs. Here we'll paste a series of files and folders we think shouldn't be committed but you are more than welcome to customize it as you see fit.

    # dependencies
    node_modules/

    # production
    build/

    # misc
    .DS_Store

    # environment variables
    .env

    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

If we start the server and attempt to connect to the database as we've done before, everything should continue to work as expected.

> In the code samples provided with Part I of this course, we _won't be committing a .env file of configuration variables_. You will need to ensure a `.env` file is created in the root of the project directory and declare the `PORT`, `DB_USER`, `DB_USER_PASSWORD`, and `DB_CLUSTER` environment variables. The database configuration variables should be retrieved from your MongoDB Atlas dashboard.

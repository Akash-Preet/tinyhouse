# Module 4 Introduction

We created a GraphQL API with the help of the Apollo Server package. However, we haven't been able to persist any of the changes we made to our data.

In this module, we'll use a database to contain any data we want to be persisted. We're going to set up this database with [MongoDB](https://www.mongodb.com) and use a database as a service known as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

In this module, we'll:

- Introduce MongoDB.
- Set up a new database cluster with MongoDB Atlas.
- Connect our server with our database using the official [Node Mongo driver](https://mongodb.github.io/node-mongodb-native/index.html).
- Introduce TypeScript generics to enforce types to our database.
- Create a simple script to help seed our database with initial data.
- Have our resolver functions process data from our database.
- Finally, modularize our resolvers.

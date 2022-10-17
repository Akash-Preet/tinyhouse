# Introduction to MongoDB

## SQL vs NoSQL

When it comes to deciding on a database, one of the bigger questions that often needs to be addressed is either using a **relational database** or a **non-relational database**. Relational databases are often recognized as SQL databases while non-relational databases are often recognized as NoSQL Databases.

SQL databases use a **Structured Query Language** for manipulating and reading data which are stored in tables. Data is stored in tables as rows and columns with predefined relationships between them (hence the term - a _relational_ database). SQL databases require us to use defined schemas to determine the data structure. The advantage of this is we can always be confident in the structure of our data. However, this also means that a significant change in schema, later on, would be difficult to manage and somewhat disruptive since earlier forms of data may not match the newer schema.

A NoSQL database, on the other hand, has dynamic schema (or no schema at all) for unstructured data which can be stored in many ways (e.g such as document-oriented). The advantage of this is we can easily change our data structure as our app evolves. However, **this does not mean code will just magically work**. Because of this flexibility, additional checks are needed in our code to ensure our app logic can handle data with different structures.

SQL is a good choice for any app that will benefit from a well-defined data structure (e.g. accounting). NoSQL is a good choice for any app that may have rapid changing data structures. If we can't define a schema for a database or if a schema is expected to change, NoSQL may be a good choice.

What we've talked about is a very high-level difference between relational and non-relational databases. A lot of other topics can also be compared such as scalability, compatibility with certain languages, speed, performance, etc. We're not stating one approach is better than the other because it really comes down to a lot of different factors. With that said, we've decided to use a NoSQL database for our course known as [**MongoDB**](https://www.mongodb.com/) due to how incredibly easy MongoDB is to use and implement to begin persisting data within an application.

## MongoDB

MongoDB is a NoSQL database system that stores data in [JSON-like documents](https://www.mongodb.com/json-and-bson). We can integrate MongoDB to an app by [installing it locally on our computer](https://docs.mongodb.com/manual/installation/) or using a database-as-a-service (DBaaS) platform (e.g. [mLab](https://mlab.com/), [ObjectRocket](https://www.objectrocket.com/), [Atlas](https://www.mongodb.com/cloud/atlas), etc). There are a few advantages to using a DBaaS platform:

- Maintenance and management of the database infrastructure becomes the responsibility of the service provider.
- Out of the box security set-up.
- Scalability and higher availability. As our app grows, we can re-configure our cloud database with more processing power.

In the next lesson, we'll use the official Mongo Cloud Database named [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to create our first Mongo cluster and database!

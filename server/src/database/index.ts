import { Database } from "./../lib/types";
import { ConnectOptions, MongoClient } from "mongodb";

const user = "user_1";
const userPassword = "passw0rd";
const cluster = "cluster0.bbz0w";

// const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/test`;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};

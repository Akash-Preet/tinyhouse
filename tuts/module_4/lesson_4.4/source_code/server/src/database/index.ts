import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

// Note: Need to add appropriate credentials here to make the connection
// Note #2: Database credentials should never be committed to source code!
const user = "XXX";
const userPassword = "XXXXXX";
const cluster = "XXXX";

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db("main");

  return {
    listings: db.collection("test_listings")
  };
};

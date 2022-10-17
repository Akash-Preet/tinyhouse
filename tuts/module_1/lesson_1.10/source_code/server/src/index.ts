import express from "express";
import bodyParser from "body-parser";
import { listings } from "./listings";

const app = express();
const port = 9000;

const one = 1;
const two = 2;

app.use(bodyParser.json());

app.get("/", (_req, res) => res.send(`1 + 2 = ${one + two}`));

app.get("/listings", (_req, res) => {
  res.send(listings);
});

app.post("/delete-listing", (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1)[0]);
    }
  }

  return res.send("failed to deleted listing");
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);

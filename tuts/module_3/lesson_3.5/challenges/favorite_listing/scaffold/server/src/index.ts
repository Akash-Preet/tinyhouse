import express from "express";
import bodyParser from "body-parser";
import { listings } from "./listings";

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get("/listings", (_req, res) => {
  res.send(listings);
});

app.post("/favorite-listing", (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      listings[i].favorite = !listings[i].favorite;
      return res.send(listings[i]);
    }
  }

  return res.send("failed to favorite listing");
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);

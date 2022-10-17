import express from "express";
import bodyParser from "body-parser";
import { listings } from "./listings";

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get("/listings", (_req, res) => {
  res.send(listings);
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);

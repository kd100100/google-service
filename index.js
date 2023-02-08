import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import getSpeechFromText from "./service/getSpeechFromText.js";

config();

const app = express();
app.use(bodyParser.json());

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/text-to-speech", async (req, res) => {
  const { text } = req.body;

  const speech = await getSpeechFromText(text);

  res.send(speech);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

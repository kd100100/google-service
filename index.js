import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import getSpeechFromText from "./service/getSpeechFromText.js";
import getTextFromSpeech from "./service/getTextFromSpeech.js";

config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/text-to-speech", async (req, res) => {
  const { text } = req.body;

  const speech = await getSpeechFromText(text);

  res.send(speech);
});

app.post("/api/v1/speech-to-text", async (req, res) => {
  const { speech } = req.body;

  console.log(speech);
  const text = await getTextFromSpeech(speech);
  console.log(text);

  res.send(text);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

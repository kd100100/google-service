import { SpeechClient } from "@google-cloud/speech";

async function getTextFromSpeech(speech) {
  const client = new SpeechClient({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const audio = {
    content: speech,
  };
  const config = {
    sampleRateHertz: 48000,
    encoding: "WEBM_OPUS",
    languageCode: "en-IN",
    model: "default",
  };
  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  console.log(response);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
  return "";
}

export default getTextFromSpeech;

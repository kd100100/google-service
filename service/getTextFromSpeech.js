import { SpeechClient } from "@google-cloud/speech";

async function getTextFromSpeech(speech) {
  const client = new SpeechClient({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const audio = {
    uri: "gs://cloud-samples-data/speech/brooklyn_bridge.raw",
  };
  const config = {
    enableAutomaticPunctuation: true,
    enableAutomaticPunctuation: true,
    maxAlternatives: 1,
    profanityFilter: false,
    sampleRateHertz: 16000,
    encoding: "LINEAR16",
    languageCode: "en-IN",
    model: "default",
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  console.log(response);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
  return "";
}

export default getTextFromSpeech;

import { TextToSpeechClient } from "@google-cloud/text-to-speech";

async function getSpeechFromText() {
  const client = new TextToSpeechClient({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });
  const text = "hello, world!";

  const request = {
    audioConfig: {
      audioEncoding: "LINEAR16",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1,
    },
    input: { text: text },
    voice: {
      languageCode: "en-US",
      name: "en-US-Neural2-J",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
}

export default getSpeechFromText;

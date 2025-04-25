import OpenAI from "openai";

let openai;

try {
  openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Updated to use the new open API key

  });

} catch (error) {
  console.error("Error initializing OpenAI client:", error);
}

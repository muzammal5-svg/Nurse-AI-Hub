import {Pinecone} from "@pinecone-database/pinecone";


let pinecone;

try {
  pinecone = new Pinecone({

    apiKey:  String(process.env.PINECONE_API_KEY!),
    // environment:  String(process.env.PINECONE_ENVIRONMENT!),
  });
} catch (error) {
  console.error("Error initializing Pinecone client:", error);
}

export const PINECONE_INDEX_NAME = String(process.env.PINECONE_INDEX_NAME);

import { ChromaClient, Collection } from "chromadb";

const client = new ChromaClient({
  host: process.env.CHROMA_HOST ?? "localhost",
  port: 8000,
  ssl: false
});

export async function getCollection() : Promise<Collection> {
  return await client.getOrCreateCollection({
    name: "pdf_documents",
    metadata: { "hnsw:space": "cosine" },
  });
}
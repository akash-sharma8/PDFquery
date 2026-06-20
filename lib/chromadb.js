import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",
  port: 8000,
  ssl: false
});

export async function getCollection() {
  return await client.getOrCreateCollection({
    name: "pdf_documents",
    metadata: { "hnsw:space": "cosine" },
  });
}
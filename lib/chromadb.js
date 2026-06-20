import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
  apiKey: process.env.CHROMA_API_KEY,
});

export async function getCollection() {
  return await client.getOrCreateCollection({
    name: "pdf_documents",
    metadata: { "hnsw:space": "cosine" },
  });
}
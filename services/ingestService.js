import { getCollection } from "@/lib/chromadb"
import { parsePdfBuffer } from "@/lib/pdfParser"
import { createChunks } from "../lib/chunker"
import { createEmbedding } from "../lib/embedding"

export async function runIngestPipeline(fileBuffer, fileName) {
    const fullText = await parsePdfBuffer(fileBuffer)

    const chunks = await createChunks(fullText, 1000);

    const collection = await getCollection();

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await createEmbedding(chunk);

        await collection.add({
            ids: [`${fileName}-chunk-${i}`],
            documents: [chunk],
            embeddings: [embedding],
            metadatas: [{
                source: fileName,
                chunk: i,
                timestamp: Date.now()
            }]
        });
        const count = await collection.count();

        console.log("Total docs:", count);
        console.log("Embedding sucess")
    }
    return {
        chunksCount: chunks.length,
        fileName
    };
}
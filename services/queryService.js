
import { getCollection } from "@/lib/chromadb";
import { createEmbedding } from "../lib/embedding";
import { generateAnswer } from "@/lib/llm";

export async function queryPDF(question) {

    try {

        const embededQue = await createEmbedding(question)

        const collection = await getCollection();

        const result = await collection.query({
            queryEmbeddings: [embededQue],
            nResults: 5
        })


        const documents = result.documents?.[0] || [];
        if (!documents.length) {
            return {
                answer:
                    "No relevant information found in uploaded PDFs.",
                sources: []
            };
        }
        const metadatas = result.metadatas?.[0] || [];

        const context = documents.join("\n\n");

        const answer = await generateAnswer(
            question,
            context
        )


        const sources = metadatas.map((meta) => ({
            source: meta.source,
            chunk: meta.chunk,
        }));
        return {
            answer,
            sources,
        };

    } catch (error) {
        console.error("Query Service Error:", error);

        throw new Error("Failed to query PDF");
    }



}

import { InferenceClient } from '@huggingface/inference';
const hf = new InferenceClient(process.env.HF_TOKEN, {
    provider: "hf-inference"
});

export async function createEmbedding(text) {
    const response = await hf.featureExtraction({
        model: 'BAAI/bge-large-en-v1.5',
        inputs: text,
    });

    return response;
}


import { InferenceClient } from '@huggingface/inference';


const token = process.env.HF_TOKEN;

if (!token) {
  throw new Error("HF_TOKEN is not defined");
}

const hf = new InferenceClient(token);

export async function createEmbedding(text:string):Promise<number[]> {
    const response = await hf.featureExtraction({
        model: 'BAAI/bge-large-en-v1.5',
        inputs: text,
    });

    return response as number[];
}

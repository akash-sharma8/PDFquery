import { InferenceClient } from "@huggingface/inference";


const hf = new InferenceClient(process.env.HF_TOKEN, {
  provider: "hf-inference"
});
export async function generateAnswer(question, context) {
  const response = await hf.chatCompletion({
    model: "meta-llama/Llama-3.3-70B-Instruct",
    messages: [
      {
        role: "system",
        content:
          `You are a professional AI document assistant.

Format every answer in clean markdown.

Rules:
- Use headings (##)
- Use bullet points
- Use numbered lists
- Add spacing between sections
- Never return one large paragraph
- Make answers easy to scan

Example:

## Key Corrections

### 1. Hero CTA Optimization
- Added centered CTA button
- Reduced supporting text size

### 2. Trusted Partners Section
- Moved directly below hero section

### 3. Logo Carousel
- Replaced static logos with infinite carousel`
      },
      {
        role: "user",
        content: `
Context:
${context}

Question:
${question}
`
      }
    ],
    max_tokens: 500
  });

  return response.choices[0].message.content;
}
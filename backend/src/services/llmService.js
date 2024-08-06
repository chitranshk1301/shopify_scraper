import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const summarizeProduct = async (description) => {
  try {
    const response = await getGroqChatCompletion(description);
    return response.choices[0]?.message?.content.trim().split('\n').filter(point => point.trim() !== '');
  } catch (error) {
    console.error('Error in summarizeProduct:', error);
    return ['Error summarizing product.'];
  }
};

export async function getGroqChatCompletion(description) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes product descriptions in 3-4 bullet points."
      },
      {
        role: "user",
        content: `Summarize this product description in 3-4 bullet points: ${description}`
      }
    ],
    model: "llama3-8b-8192",
  });
}

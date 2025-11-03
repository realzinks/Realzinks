
import { GoogleGenAI } from "@google/genai";
import { Question } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getQuestionExplanation = async (question: Question, userAnswer: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is not configured. Cannot fetch AI explanation.";
  }

  const model = 'gemini-2.5-flash';
  const correctAnswer = question.options[question.correctAnswerIndex];

  const prompt = `
    You are an expert tutor for Nigerian civil service exams. A student is practicing a question.

    Question: "${question.text}"
    The options were: ${question.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join(', ')}.
    The correct answer is: "${correctAnswer}".
    The student answered: "${userAnswer}".

    Please provide a clear, concise explanation for why the correct answer is right. If the student's answer was wrong, also briefly explain why their choice was incorrect. Keep the tone encouraging and educational. Format your response using markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini API:", error);
    return "Sorry, I couldn't fetch an explanation at this time. Please check your connection or API key.";
  }
};

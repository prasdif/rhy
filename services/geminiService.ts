import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Access the API key exclusively from process.env as per requirements
    const apiKey = process.env.API_KEY;

    // Defensive check for production environments (Vercel)
    if (!apiKey) {
      console.error("Gemini API Key is missing. Please check your Vercel/environment variables.");
      return "i'm sorry, my ai component is currently offline (missing configuration).";
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Access text property directly
    return response.text || "i'm sorry, i couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    
    // More specific error message for common API issues
    const errorMessage = error instanceof Error ? error.message : "";
    if (errorMessage.toLowerCase().includes("api key")) {
      return "it seems there is an issue with my access credentials. please verify the api key.";
    }
    
    return "i'm currently having trouble connecting to my brain. please try again later.";
  }
};
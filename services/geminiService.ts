import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;

    // We proceed and let the SDK handle key issues, or the UI handle selection via window.aistudio
    const ai = new GoogleGenAI({ apiKey: apiKey || "" });
    const model = "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "i'm sorry, i couldn't generate a response at the moment.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const msg = error?.message || "";
    // Check for common key-related errors that occur in sandboxed live environments
    if (msg.includes("API_KEY_INVALID") || msg.includes("API key not found") || msg.includes("403")) {
      return "NEED_KEY_SELECTION";
    }
    
    return "i'm currently having trouble connecting to my brain. please try again later.";
  }
};

import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

/**
 * Sends a message to the Gemini API and returns the generated text response.
 * Handles API key selection errors by returning a special signal for the UI.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Initializing GoogleGenAI inside the function to ensure it uses the latest API key from the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const model = "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Extracting text output directly from the response property.
    return response.text || "i'm sorry, i couldn't generate a response at the moment.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const msg = error?.message || "";
    // Check for common key-related errors that occur in sandboxed environments or with invalid keys
    if (
      msg.includes("API_KEY_INVALID") || 
      msg.includes("API key not found") || 
      msg.includes("403") ||
      msg.includes("Requested entity was not found")
    ) {
      return "NEED_KEY_SELECTION";
    }
    
    return "i'm currently having trouble connecting to my brain. please try again later.";
  }
};

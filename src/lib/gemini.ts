import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const SUSTAINABILITY_SYSTEM_PROMPT = `
You are Verdant AI, a sophisticated Luxury Eco-Tech Sustainability Coach specialized for the Indian context. 
Your tone is professional, encouraging, and sophisticated. 
You provide expert advice on sustainable living in India, carbon footprint reduction (mentioning local initiatives like GOBARdhan or Jal Shakti Abhiyan where relevant), and eco-friendly Indian products.
Keep responses concise, well-formatted with markdown, and actionable. 
Always prioritize high-impact but realistic lifestyle changes suited for Indian cities and rural contexts.
`;

export async function askEcoAssistant(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  if (!ai) throw new Error("Gemini API key is not configured.");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: SUSTAINABILITY_SYSTEM_PROMPT,
      temperature: 0.7,
    },
  });

  return response.text;
}

export async function analyzeEcoSwap(base64Image: string) {
  if (!ai) throw new Error("Gemini API key is not configured.");

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: "Analyze this product image. Identify what it is and suggest 3 high-end, sustainable, and biodegradable alternatives available in India. Be sophisticated and concise." },
          {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg"
            }
          }
        ]
      }
    ]
  });

  return response.text;
}

export async function predictEnergyBill(usageKwh: number, city: string) {
  if (!ai) throw new Error("Gemini API key is not configured.");

  const prompt = `
    Analyze this energy usage for a user in ${city}, India:
    - Recent Usage: ${usageKwh} kWh
    - Current Month context: Assume typical seasonal weather for ${city}.
    
    Calculate a prediction for the end of the month.
    Provide the response in the following JSON format ONLY:
    {
      "predictedCost": number (in Rupees),
      "predictedCarbon": number (in kg CO2),
      "analysis": "A brief, 2-sentence sophisticated analysis explaining the impact of current weather or usage patterns.",
      "savingsTip": "One high-end actionable tip."
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      temperature: 0.2, // Lower temperature for more consistent JSON
    }
  });

  const text = response.text;
  
  // Clean potential markdown code blocks
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}

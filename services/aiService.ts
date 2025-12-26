
import { GoogleGenAI, Type } from "@google/genai";
import { BoilerplateSummary } from "../types";

export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async getRecommendation(query: string, boilerplates: BoilerplateSummary[]) {
    const catalogSnippet = boilerplates.map(b => 
      `- ${b.name} (${b.identifier}): ${b.description}. Tags: ${b.tags.join(', ')}`
    ).join('\n');

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for a boilerplate for their project. 
      Their requirements: "${query}"
      
      Available catalog:
      ${catalogSnippet}
      
      Recommend the best matches. Return a JSON object with:
      1. 'recommendation': A short, guru-like wise piece of advice (max 2 sentences).
      2. 'matchingIdentifiers': An array of strings containing the 'identifier' of the top 3 matches.
      3. 'reasoning': Why these choices fit.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING },
            matchingIdentifiers: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING }
          },
          required: ["recommendation", "matchingIdentifiers", "reasoning"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      console.error("Failed to parse Guru advice", e);
      return null;
    }
  }
}

export const aiService = new AiService();

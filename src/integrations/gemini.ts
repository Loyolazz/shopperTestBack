import { GoogleGenerativeAI } from "@google/generative-ai";

const genIA = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export const gemini = genIA.getGenerativeModel({
    model: "gemini-1.5-flash",
});
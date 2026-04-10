import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const finalPrompt = (message) => {
  return `system instruction do: ${message}`;
};

async function callHuggingFace(prompt, key) {
  try {
    const res = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "Qwen/Qwen3.5-35B-A3B:novita",
        messages: [
          {
            role: "user",
            content: finalPrompt(prompt),
          },
        ],
        maxtokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data.choices?.[0]?.message?.content || "No response";
  } catch (err) {
    if (err.response) {
      console.error("HF Error Data:", err.response.data);
      console.error("HF Status:", err.response.status);
    } else {
      console.error("HF Error:", err.message);
    }
    return "AI Error";
  }
}

export default callHuggingFace;

import { GoogleGenAI } from "@google/genai";
import { success } from "./response.util.js";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function callGemini(req, res) {
  try {
    const prompt = req.params.chat;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    res.status(200).json({
      success: true,
      data: response.text,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

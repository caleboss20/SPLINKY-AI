import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
   app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ reply: "No prompt provided" });
    }
    // Correct call to Gemini
    const result = await model.generateContent({
      contents: [{ text: prompt }]
    });
    // Gemini response structure
    // result.output[0].content[0].text
    const reply = result.output?.[0]?.content?.[0]?.text || "No response";
    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ reply: "Something went wrong." });
  }
});
app.listen(5000, () => console.log("Server running on port 5000"));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors(
  {origin: "http://localhost:5173"}
));

app.use(express.json());

const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_KEY })
//GoogleGenerativeAI(process.env.GEMINI_KEY);

//const model = genAI.getGenerativeModel({ model: "gemini-pro" });

   
app.post("/api/chat", async (req, res) => {
  try {
    const prompt  = req.body.prompt;
    
    if (!prompt) {
      return res.status(400).json({ reply: "No prompt provided" });
    }
    // Correct call to Gemini
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
    contents: prompt
  }
    );
    const response = result.text;
    
    // Gemini response structure
    // result.output[0].content[0].text
    //const reply = result.output?.[0]?.content?.[0]?.text || "No response";
    res.json({ reply:response });

  } catch (err) {
    
    console.error("Gemini error:", err);
    res.status(500).json({ reply: "Something went wrong." });
  }
});
app.listen(5000, () => console.log("Server running on port 5000"));
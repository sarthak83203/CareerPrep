import Groq from "groq-sdk";
import Session from "../models/Session.js";
import Question from "../models/Question.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* ---------------- HELPER: Extract JSON ARRAY ---------------- */
const extractJsonArray = (text) => {
  const firstBracket = text.indexOf("[");
  const lastBracket = text.lastIndexOf("]");

  if (firstBracket === -1 || lastBracket === -1) {
    throw new Error("No JSON array found in AI response");
  }

  return text.slice(firstBracket, lastBracket + 1);
};

/* ---------------- GENERATE QUESTIONS ---------------- */

export const generateInterviewQuestions = async (req, res) => {
    console.log("REQ.USER ", req.user);
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    } = req.body;

    /* ---- VALIDATION ---- */
    if (
      !role ||
      !experience ||
      !Array.isArray(topicsToFocus) ||
      topicsToFocus.length === 0 ||
      !numberOfQuestions
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid required fields" });
    }

    /* ---- CREATE SESSION ---- */
    const session = await Session.create({
      user: req.user._id,
      role,
      experience,
      topics: topicsToFocus
    });

    /* ---- AI PROMPT ---- */
    const prompt = `
Generate ${numberOfQuestions} interview questions for a ${role}
with ${experience} experience on topics: ${topicsToFocus.join(", ")}.

Return ONLY a valid JSON array.
Each element must have:
- question
- answer

Do NOT add explanations or extra text.
`;

    /* ---- CALL AI ---- */
    const response = await groq.chat.completions.create({
      model:"llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful interview assistant." },
        { role: "user", content: prompt }
      ]
    });

    const rawText = response.choices[0].message.content;

    /* ---- PARSE AI RESPONSE SAFELY ---- */
    let questionsArray;
    try {
      const jsonString = extractJsonArray(rawText);
      questionsArray = JSON.parse(jsonString);
    } catch (err) {
      console.error("AI RAW RESPONSE:\n", rawText);
      return res.status(500).json({
        message: "Failed to parse AI response",
        rawText
      });
    }

    /* ---- SAVE QUESTIONS TO DB ---- */
    const savedQuestions = await Question.insertMany(
      questionsArray.map((q) => ({
        session: session._id,
        question: q.question,
        answer: q.answer
      }))
    );

    /* ---- FINAL RESPONSE ---- */
    res.status(201).json({
      success: true,
      sessionId: session._id,
      questions: savedQuestions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- CONCEPT EXPLANATION ---------------- */
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const response = await groq.chat.completions.create({
      model:"llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Explain programming concepts clearly with examples."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    res.json({
      success: true,
      explanation: response.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

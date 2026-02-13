import Groq from "groq-sdk";
import Session from "../models/Session.js";
import Question from "../models/Question.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* ---------------- SAFE JSON EXTRACTOR ---------------- */
const extractJsonArray = (text) => {
  // 1 Try ```json``` block first (BEST)
  const jsonBlock = text.match(/```json([\s\S]*?)```/);
  if (jsonBlock) {
    return jsonBlock[1].trim();
  }

  // 2️Fallback: try first [ ... ] array
  const first = text.indexOf("[");
  const last = text.lastIndexOf("]");
  if (first !== -1 && last !== -1) {
    return text.slice(first, last + 1);
  }

  console.error(" RAW AI TEXT (NO JSON FOUND):\n", text);
  throw new Error("No JSON found in AI response");
};

/* ---------------- GENERATE QUESTIONS ---------------- */
export const generateInterviewQuestions = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      description,
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

    console.log("REQ.USER:", req.user);

    /* ---- CREATE SESSION (SAFE USER) ---- */
    const session = await Session.create({
      user: req.user?._id || null,   // PREVENT CRASH
      role,
      experience,
      topicsToFocus,
      description,
    });

    /* ---- AI PROMPT (STRICT BUT FLEXIBLE) ---- */
    const prompt = `
Generate ${numberOfQuestions} interview questions for a ${role}
with ${experience} experience on topics: ${topicsToFocus.join(", ")}.

Try to return a valid JSON array wrapped in a \`\`\`json\`\`\` code block.

Each object MUST have:
- question (string)
- answer (string, detailed and beginner friendly)

If you cannot wrap in json block, still return a pure JSON array.

DO NOT return anything except JSON.
`;

    /* ---- CALL GROQ ---- */
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
       max_tokens: 4000, 
      messages: [
        { role: "system", content: "You are a JSON API. Output JSON only." },
        { role: "user", content: prompt },
      ],
    });

    const rawText = response.choices[0].message.content;

    console.log("========== AI RAW RESPONSE ==========");
    console.log(rawText);

    /* ---- PARSE AI RESPONSE SAFELY ---- */
    let questionsArray;
    try {
      const jsonString = extractJsonArray(rawText);
      console.log("========== EXTRACTED JSON ==========");
      console.log(jsonString);

      questionsArray = JSON.parse(jsonString);
    } catch (err) {
      console.error("JSON PARSE ERROR:", err.message);
      console.error(" RAW AI TEXT:\n", rawText);

      return res.status(500).json({
        message: "Failed to parse AI response",
        rawText,
      });
    }

    console.log("========== PARSED QUESTIONS ==========");
    console.log(questionsArray);

    if (!Array.isArray(questionsArray)) {
      return res.status(500).json({
        message: "AI did not return an array",
        rawText,
      });
    }

    /* ---- CLEAN + VALIDATE ---- */
    const cleaned = questionsArray.filter(
      (q) => q && q.question && q.answer
    );

    if (cleaned.length === 0) {
      return res.status(500).json({
        message: "AI returned empty questions or answers",
        rawText,
      });
    }

    /* ---- SAVE TO DB ---- */
    const savedQuestions = await Question.insertMany(
      cleaned.map((q) => ({
        session: session._id,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions = savedQuestions.map((q) => q._id);
    await session.save();

    /* ---- FINAL RESPONSE ---- */
    res.status(201).json({
      success: true,
      sessionId: session._id,
      questions: savedQuestions,
    });
  } catch (error) {
    console.error(" SERVER ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
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
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "Explain programming concepts clearly with examples and markdown.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const explanation = response.choices[0].message.content;

    console.log("========== CONCEPT EXPLANATION ==========");
    console.log(explanation);

    res.json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

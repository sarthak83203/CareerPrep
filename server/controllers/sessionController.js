const Groq = require("groq-sdk");
const Session = require("../models/Session");
const Question = require("../models/Question");
const { questionAnswerPrompt } = require("../utils/prompts");

// Initialize Groq client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ---------- Helper to safely extract JSON array ----------
function extractJsonArray(text) {
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new Error("No JSON array found in AI response");
  }
  return match[0];
}

// ---------- CREATE SESSION ----------
const createSession = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { role, experience, topicsToFocus, description, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const userId = req.user._id;

    // Normalize topics
    const topics = Array.isArray(topicsToFocus)
      ? topicsToFocus
      : topicsToFocus.split(",").map(t => t.trim());

    const prompt = questionAnswerPrompt(role, experience, topics, numberOfQuestions);

    // 🔴 STRICT JSON SYSTEM PROMPT (CRITICAL FIX)
    const aiResponse = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a strict JSON API. Return ONLY a valid JSON array. No markdown. No code blocks. No explanations. No extra text.",
        },
        { role: "user", content: prompt },
      ],
    });

    const rawText = aiResponse?.choices?.[0]?.message?.content;

    if (!rawText) {
      return res.status(500).json({
        success: false,
        message: "AI response is empty",
      });
    }

    let generatedQuestions = [];

    try {
      const jsonText = extractJsonArray(rawText);
      generatedQuestions = JSON.parse(jsonText);

      if (!Array.isArray(generatedQuestions)) {
        throw new Error("Parsed data is not an array");
      }
    } catch (err) {
      console.error("AI JSON parse failed:", rawText);
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        rawText,
      });
    }

    // Validate AI objects
    const safeQuestions = generatedQuestions.filter(
      q => q.question && q.answer
    );

    if (safeQuestions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "AI did not return valid questions",
      });
    }

    // Create session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus: topics,
      description,
    });

    // Save questions
    const questionDocs = await Question.insertMany(
      safeQuestions.map(q => ({
        session: session._id,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions = questionDocs.map(q => q._id);
    await session.save();

    res.status(201).json({
      success: true,
      session,
      questionsCount: questionDocs.length,
    });

  } catch (err) {
    console.error("Error in createSession:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ---------- GET MY SESSIONS ----------
const getMySessions = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({ success: true, sessions });
  } catch (err) {
    console.error("Error in getMySessions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------- GET SESSION BY ID ----------
const getSessionById = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const session = await Session.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: 1 } },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({ success: true, session });
  } catch (err) {
    console.error("Error in getSessionById:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------- DELETE SESSION ----------
const deleteSession = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteSession:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession,
};

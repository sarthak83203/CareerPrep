const Groq = require("groq-sdk");
const Session = require("../models/Session");
const Question = require("../models/Question");
const { questionAnswerPrompt } = require("../utils/prompts");

// Initialize Groq client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Create a new session with AI-generated questions
const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, numberOfQuestions } = req.body;
    const userId = req.user._id;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Normalize topicsToFocus to array
    const topics = Array.isArray(topicsToFocus)
      ? topicsToFocus
      : topicsToFocus.split(",").map((t) => t.trim());

    // Generate AI questions via Groq
    const prompt = questionAnswerPrompt(role, experience, topics, numberOfQuestions);

    const aiResponse = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    const rawText = aiResponse.choices[0].message.content;
    const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    let generatedQuestions;
    try {
      generatedQuestions = JSON.parse(cleanedText);
    } catch (parseError) {
      return res.status(500).json({ success: false, message: "Failed to parse AI response", rawText });
    }

    // Create session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus: topics,
      description,
    });

    // Save AI-generated questions
    const questionDocs = await Promise.all(
      generatedQuestions.map(async (q) => {
        const questionDoc = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return questionDoc._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all sessions for logged-in user
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get session by ID with questions populated
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({ path: "questions", options: { sort: { isPinned: -1, createdAt: 1 } } })
      .exec();

    if (!session) return res.status(404).json({ success: false, message: "Session not found" });

    res.status(200).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a session and its questions
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete linked questions first
    await Question.deleteMany({ session: session._id });

    // Delete the session
    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createSession, getMySessions, getSessionById, deleteSession };

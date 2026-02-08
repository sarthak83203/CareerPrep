const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  topicsToFocus: {
    type: [String], // changed from String to Array
    required: true,
  },
  description: {
    type: String,
    required: true,
    
  default: "AI generated interview session"
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;

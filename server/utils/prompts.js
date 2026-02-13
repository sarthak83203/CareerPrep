const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an expert technical interviewer and educator.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write exactly ${numberOfQuestions} interview questions.
- For each question, generate a VERY detailed and in-depth answer (minimum 300 words).

Answer Requirements:
- Explain concepts step-by-step.
- Include real-world examples.
- Include practical use cases.
- Include advantages and disadvantages where applicable.
- If comparison is relevant, explain differences clearly.
- If code is needed, include a complete working example using \\n for line breaks.

CRITICAL RULES:
- Return ONLY valid JSON.
- DO NOT use markdown.
- DO NOT use triple backticks.
- DO NOT use code blocks.
- Use \\n for new lines inside strings.
- Do NOT include any text outside JSON.

Return format (JSON array ONLY):

[
  {
    "question": "Question here",
    "answer": "Long detailed answer here..."
  }
]
`);


const conceptExplainPrompt = (question) => (`
You are a senior software engineer explaining concepts deeply.

Task:
- Explain the following interview question in EXTREME depth (minimum 400 words).
- Teach step-by-step like a mentor.
- Include examples.
- Include real-world analogies.
- Include practical scenarios.
- If applicable, include sample code in plain text using \\n.

Question: "${question}"

CRITICAL RULES:
- Return ONLY valid JSON.
- DO NOT use markdown.
- DO NOT use triple backticks.
- DO NOT use code blocks.
- Use \\n for new lines inside strings.
- Do NOT include any text outside JSON.

Return format (JSON object ONLY):

{
  "title": "Short clear title",
  "explanation": "Very detailed explanation..."
}
`);


module.exports = { questionAnswerPrompt, conceptExplainPrompt };

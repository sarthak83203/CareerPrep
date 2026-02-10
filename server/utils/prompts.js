const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write exactly ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.

CRITICAL RULES:
- Return ONLY valid JSON.
- DO NOT use markdown.
- DO NOT use triple backticks.
- DO NOT use code blocks.
- If code is needed, include it as plain text with \\n for new lines.
- Do NOT include any text outside JSON.

Return format (JSON array ONLY):

[
  {
    "question": "Question here",
    "answer": "Answer here with any code as plain text using \\n"
  }
]
`);


const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title.

CRITICAL RULES:
- Return ONLY valid JSON.
- DO NOT use markdown.
- DO NOT use triple backticks.
- DO NOT use code blocks.
- If code is needed, include it as plain text with \\n for new lines.
- Do NOT include any text outside JSON.

Return format (JSON object ONLY):

{
  "title": "Short title here",
  "explanation": "Explanation here with any code as plain text using \\n"
}
`);


module.exports = { questionAnswerPrompt, conceptExplainPrompt };

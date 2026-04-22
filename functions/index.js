const { setGlobalOptions } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const { GoogleGenAI } = require("@google/genai");

setGlobalOptions({ maxInstances: 10 });

exports.generateJobs = onCall({ secrets: ["GEMINI_KEY"], cors: true }, async (request) => {
  const { resume, previousJobs, favoritedJobs, prompt } = request.data;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

  const fullPrompt = `
    You are a helpful career assistant. Based on the following resume and prompt, suggest 10 realistic internship opportunities for a college student.

    Keep suggestions pragmatic and entry-level — real companies that actually hire interns for these roles, not aspirational picks like Google or Meta unless the resume strongly supports it.

    Also, make sure that you do not repeat opportunities listed in the previous suggestions or from the favorited list.

    For each internship, provide:
      - Company name
      - Role/Position title
      - Description of the position
      - Required skills they already have
      - Skills they may need to develop
      - The location of the internship
      - favorited status (just set to false)
      - A unique id 

    Resume: ${JSON.stringify(resume)}
    Previous Suggestions: ${JSON.stringify(previousJobs)}
    Favorited List: ${JSON.stringify(favoritedJobs)}
    Prompt: ${prompt}

    Respond in JSON format like this:
    [
      {
        "company": "Google",
        "role": "Software Engineering Intern",
        "description": "...",
        "matchingSkills": ["React", "Python"],
        "skillsToLearn": ["Kubernetes"],
        "location": "...",
        "favorite": false,
        "id": "..."
      }
    ]
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: fullPrompt,
  });

  const text = response.text;
  const cleaned = text.replace(/```json|```/g, "").trim();
  return { jobs: JSON.parse(cleaned) };
});
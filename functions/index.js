const { setGlobalOptions } = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { GoogleGenAI } = require("@google/genai");

setGlobalOptions({ maxInstances: 10 });

exports.generateJobs = onCall({ secrets: ["GEMINI_KEY", "ADZUNA_APP_ID", "ADZUNA_API_KEY"], cors: true }, async (request) => {
  const { resume, previousJobs, favoritedJobs, prompt } = request.data;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

  // Step 1: Generate Adzuna query string
  let text;
  try {
    const fullPrompt = `
      You are a helpful career assistant. Generate a search query string for the Adzuna job search API to find relevant internships. Given the user resume and user request.
      
      Generate a query string in this EXACT format:
      what=software+engineer+intern&where=New+York

      Resume: ${JSON.stringify(resume)}
      User Request: ${prompt}
      
      Rules:
      - Replace spaces with + in all values
      - "what" should be 2-5 keywords, always include "intern" or "internship"
      - "where" defaults to "USA" if the user has not specified a location
      - Keep "what" broad enough to return good results but specific enough to be relevant
      
      Respond ONLY with the raw query string, no explanation, no markdown, no backticks.
      Example response: what=software+engineer+intern&where=New+York
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: fullPrompt
    });

    text = response.text.trim();
    console.log("Query string:", text);

    if (!text || !text.includes("what=")) {
      throw new Error(`Unexpected query format: ${text}`);
    }
  } catch (err) {
    console.error("Step 1 failed (query generation):", err);
    throw new HttpsError("internal", "Failed to generate search query.");
  }

  // Step 2: Fetch jobs from Adzuna
  let condensedListings;
  try {
    const APP_ID = process.env.ADZUNA_APP_ID;
    const API_KEY = process.env.ADZUNA_API_KEY;
    const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=50&${text}`;

    const adzunaResponse = await fetch(adzunaUrl, {
      headers: { "Accept": "application/json" }
    });

    if (!adzunaResponse.ok) {
      const errorText = await adzunaResponse.text();
      throw new Error(`Adzuna request failed with status ${adzunaResponse.status}`);
    }

    const adzunaData = await adzunaResponse.json();

    if (!adzunaData.results || !Array.isArray(adzunaData.results)) {
      console.error("Unexpected Adzuna response:", JSON.stringify(adzunaData));
      throw new Error("Adzuna response missing results array.");
    }


    if (adzunaData.results.length === 0) {
      return { jobs: [] };
    }

    condensedListings = adzunaData.results.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company?.display_name || "Unknown Company",
      location: job.location?.display_name || "Unknown Location",
      description: job.description || "",
      url: job.redirect_url || ""
    }));
  } catch (err) {
    console.error("Step 2 failed (Adzuna fetch):", err);
    throw new HttpsError("internal", "Failed to fetch job listings.");
  }

  // Step 3: Rank and filter with Gemini
  try {
    const fullPrompt2 = `
      You are a helpful career assistant. Given the resume, the list of real job listings, and the user request, select the 10 best internship matches for the candidate.
      Prioritize jobs that match the user resume better than the user request.

     STRICT RULES:
      - Only select jobs that are clearly internships or entry-level positions suitable for a college student. Reject any senior, lead, or mid-level roles even if they appear in the listings.
      - Maximum 2 jobs from the same company. Prioritize diversity of companies.
      - Location should not be the primary factor — prioritize role fit over proximity.
      - Do not repeat any jobs from the previous suggestions or favorited list.
      - matchingSkills must be specific to THAT job's requirements, not a generic list of all resume skills.
      - skillsToLearn must be specific to THAT job's requirements.

      Resume: ${JSON.stringify(resume)}
      Available Listings: ${JSON.stringify(condensedListings)}
      Previous Suggestions: ${JSON.stringify(previousJobs || [])}
      Favorited List: ${JSON.stringify(favoritedJobs || [])}
      User Request: ${prompt}

      For each selected job, provide:
      - company: the company name (from the listing, but you can reformat it if it is poorly formatted)
      - role: the job title (use from the listing, but you can reformat it if it is poorly formatted)
      - description: a description of the position, summarize the description of the listing the best you can in 100 words or less
      - matchingSkills: a JSON array of strings of skills from their resume that match this role e.g. ["React", "Python"], if none put ["N/A"]
      - skillsToLearn: a JSON array of strings of skills they may need to develop e.g. ["Kubernetes"], if none put ["N/A"]
      - location: location of the internship (from the listing), just include city and state for consistent formatting
      - applied: false (boolean, not string)
      - url: the application link (from the listing, use redirect_url exactly as given, if not given default to a google search of the link)
      - id: the job's id from the listing (use the id field exactly as given)

      Respond ONLY with a valid JSON array, no markdown, no backticks, no explanation.
    `;

    const rankingResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: fullPrompt2
    });

    const rankingText = rankingResponse.text.trim();
    const cleaned = rankingText.replace(/```json|```/g, "").trim();

    let rankedJobs;
    try {
      rankedJobs = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse Gemini ranking response:", rankingText);
      throw new Error("Gemini returned invalid JSON.");
    }

    if (!Array.isArray(rankedJobs)) {
      console.error("Gemini ranking response is not an array:", rankedJobs);
      throw new Error("Gemini response is not a JSON array.");
    }

    return { jobs: rankedJobs };
  } catch (err) {
    console.error("Step 3 failed (ranking):", err);
    throw new HttpsError("internal", "Failed to rank job listings.");
  }
});
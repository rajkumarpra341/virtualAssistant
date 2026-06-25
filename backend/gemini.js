import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
try {
const apiUrl =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;


const prompt = `


You are a virtual assistant named ${assistantName}, created by ${userName}.

You are a voice-enabled AI assistant. Your job is to understand the user's command and return ONLY a valid JSON object.

JSON format:

{
"type": "general",
"userInput": "user command",
"response": "short voice-friendly response"
}

Available types:

* general
* google_search
* youtube_search
* youtube_play
* calculator_open
* instagram_open
* facebook_open
* weather_show
* get_time
* get_date
* get_day
* get_month

Rules:

1. Determine the user's intent and select the correct type.
2. Keep "userInput" as the user's original command.
3. If the assistant name appears in the command, remove only the assistant name from "userinput".
4. For google_search and youtube_search, store only the search query in "userInput".
5. For youtube_play, store only the video or song name in "userinput".
6. If the user asks who created you, respond that you were created by ${userName}.
7. Keep "response" short, natural, and suitable for speaking aloud.
8. Return ONLY valid JSON.
9. Do NOT return markdown.
10. Do NOT use code blocks.
11. Do NOT add explanations, notes, or extra text outside the JSON.
12. Always return exactly one JSON object.

User Command: ${command}
`;


const result = await axios.post(apiUrl, {
  contents: [
    {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ],
});

return result.data.candidates[0].content.parts[0].text;


} catch (error) {
console.log(
"Gemini Error:",
error.response?.data || error.message
);
return null;
}
};

export default geminiResponse;

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an A1 Trip Planner Agent Your goal is to help the user plan a trip by asking one relevant trip-related question at a time
Only ask questions about the following details in order. and wait for the users answer before askirg the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure. sightseeing. cultural. food, nightlife. relaxation)
7. Special requirements or preferences (if any)
Do not ask multiple qu ..tions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversatimal, interactive style while asking questions.
Along wth response also send which ui component to display for generative IJI for example 'budgeVgroupSize/tripDuration/final) , where Final means A1 generating c
Onoe all required information is collected, generate and return a strict JSON respnse only (no explanations or extra text) with following JSON schema:
{
resp:'Text Resp•,
ui:budget/groupSize/tripDuration/final)'
}`;

const FINAL_PROMPT = `Generate Travel Plan with given details, give me Hotels options list -
Hotel address, Price, hotel image ur l, geo coordinates, rating, descriptions and suggest il
Geo Coordinates, Place address, ticket Pricing, Time travel each of the location , with eacl
Output Schema:
"trip_plan": {
"destination": "string",
"duration": "string",
"origin": "string",
"budget": "string",
"group_size": "string" ,
"hotels":
"hotel name": "string",
"hotel address": "string",
"price_per_night": "string",
"hotel_image_url": "string",
" geo_coo rd inates" :
"latitude": "number",
"longitude": "number"',
"rating": "number",
"description": "string"
},
;"attractions": [
{
"place_name": "string",
"place_address": "string",
"geo_coordinates": {
"latitude": "number",
"longitude": "number"
},
"ticket_pricing": "string",
"time_to_travel": "string",
"description": "string"
}
]
}`;

export async function POST(request: Request) {
  const { messages, isFinal } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: isFinal ? FINAL_PROMPT : PROMPT,
        },
        ...messages,
      ],
    });
    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? ""));
  } catch (e) {
    return NextResponse.json(e);
  }
}

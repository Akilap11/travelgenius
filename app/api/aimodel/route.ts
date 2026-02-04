import { NextResponse } from "next/server";
import OpenAI from "openai";

const PROMPT = `
You are an AI Trip Planner Agent.
Ask **one question at a time** to collect these details in order:
1. Starting location
2. Destination
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Cheap, Moderate, Luxury)
5. Trip duration (number of days)
6. Travel interests
7. Special requirements

Rules:
- Ask only one question at a time
- For starting location, destination, travel interests, and special requirements, set "ui": null (user types text)
- For group size, set "ui": "groupSize"
- For budget, set "ui": "budget"
- For trip duration, set "ui": "days"
- If the answer is unclear, ask for clarification
- Maintain a conversational style
- Always respond strictly in this JSON format:

{
  "resp": "string",       // text to display to user
  "ui": "budget" | "groupSize" | "days" | null | "final"  // which UI component to show
}
`;

const FINAL_PROMPT = `
Generate a detailed travel plan based on the given details.

Provide:
- A list of hotel options
- A day-wise itinerary
- Complete information for hotels and places

The response MUST be in valid JSON format and strictly follow the schema below.
Do not include any text outside the JSON.

Output Schema:

{
  "trip_plan": {
    "destination": "string",
    "origin": "string",
    "duration": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string"
          }
        ]
      }
    ]
  }
}
`;

type UserMessage = {
  role: "user" | "system";
  content: string;
};

type RequestBody = {
  messages: UserMessage[];
  isFinal: boolean;
};

export async function POST(request: Request) {
  const { messages, isFinal }: RequestBody = await request.json();

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: isFinal ? FINAL_PROMPT : PROMPT },
        ...messages,
      ],
    });

    const message = completion.choices[0].message;

    let data;
    try {
      data = JSON.parse(message.content ?? "{}");
    } catch {
      data = { resp: message.content ?? "", ui: "final" };
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
}

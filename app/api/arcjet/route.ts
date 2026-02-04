import arcjet, { tokenBucket } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Your Arcjet key
  rules: [
    tokenBucket({
      mode: "LIVE", // Use "DRY_RUN" to log only
      characteristics: ["userId"], // track requests by a custom user ID
      refillRate: 5, // refill 5 tokens per interval
      interval: 100, // interval in milliseconds
      capacity: 10, // max tokens
    }),
  ],
});

export async function POST(req: NextRequest) {
  try {
    const userId = "user123"; // Replace with your authenticated user ID
    const decision = await aj.protect(req, { userId, requested: 5 });

    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too many requests", reason: decision.reason },
        { status: 429 }
      );
    }

    return NextResponse.json({ name: "Hello world" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

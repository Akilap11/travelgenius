# AI Trip Planner 🌍✈️

<p align="center">
  <img src="https://raw.githubusercontent.com/Akilap11/travelgenius-ai/main/public/preview.png" width="30%" />
  <img src="https://raw.githubusercontent.com/Akilap11/travelgenius-ai/main/public/preview-2.png" width="30%" />
  <img src="https://raw.githubusercontent.com/Akilap11/travelgenius-ai/main/public/preview-3.png" width="30%" />
</p>

## Overview

AI Trip Planner is a full-stack web application that enables users to generate personalized travel itineraries using AI. The platform integrates interactive maps, location search, and authentication, demonstrating real-world AI integration in a production-style web application.

## Features

* AI-powered trip itinerary generation with structured JSON
* Interactive maps using Mapbox
* Location search via Google Places API
* User authentication and session management with Clerk
* OpenAI API integration for AI-generated itineraries
* Performance and security optimizations with Arcjet

## Tech Stack

**Frontend:**
* Next.js 14 (App Router)
* React
* TypeScript
* Mapbox

**Backend & Services:**
* Convex (Database and backend logic)
* Clerk (Authentication)
* Google Places API (Location search)
* Arcjet (Security and performance)

**AI Integration:**
* OpenAI API for generating trip data
* Custom prompts for structured outputs
* Validation of AI-generated data
* Safe rendering in the UI

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Akilap11/travelgenius-ai.git
cd travelgenius-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=**your_key**
CLERK_SECRET_KEY=**your_key**
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

# Arcjet Security
ARCJET_KEY=**your_key**
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

## Notes

* This project is mainly for learning AI integration, prompts, and Next.js features.
* It demonstrates how to handle AI output safely in a web app.
* Focus is on clean architecture, type safety, and modular components.